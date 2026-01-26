'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import styles from './CodeBlock.module.css';

const CodeBlock = ({ code, language = 'bash', inline = false }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    if (inline) {
        return (
            <span className={styles.inlineContainer}>
                <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{
                        margin: 0,
                        padding: '0.2rem 0.4rem',
                        background: '#1e1e1e', // Match codeBlock background or inlineCode style
                        fontSize: '0.95rem',
                        display: 'inline',
                        borderRadius: '4px',
                        verticalAlign: 'middle'
                    }}
                    PreTag="span"
                    CodeTag="span"
                >
                    {code}
                </SyntaxHighlighter>
            </span>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <span className={styles.language}>{language}</span>
                <button
                    onClick={handleCopy}
                    className={styles.copyButton}
                    aria-label="Copy code"
                >
                    {copied ? (
                        <span className={styles.copied}>✓ Copied</span>
                    ) : (
                        <span className={styles.copyIcon}>📋 Copy</span>
                    )}
                </button>
            </div>
            <div className={styles.codeWrapper}>
                <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus}
                    customStyle={{
                        margin: 0,
                        padding: '1rem',
                        background: 'transparent',
                        fontSize: '0.95rem',
                    }}
                    wrapLongLines={true}
                >
                    {code}
                </SyntaxHighlighter>
            </div>
        </div>
    );
};

export default CodeBlock;
