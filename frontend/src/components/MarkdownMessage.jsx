// frontend/src/components/MarkdownMessage.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; 

const MarkdownMessage = ({ content }) => {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                // Estilos para bloques de código
                code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    
                    if (!inline && match) {
                        // Bloque de código multi-línea (con scroll)
                        return (
                            <div className="bg-dark p-3 rounded-3 my-2 overflow-auto text-light">
                                <code className="text-white" {...props}>
                                    {String(children).replace(/\n$/, '')}
                                </code>
                            </div>
                        );
                    }
                    // Código inline
                    return (
                        <code className="bg-warning text-dark p-1 rounded" {...props}>
                            {children}
                        </code>
                    );
                },
                // Estilos para listas y párrafos de Bootstrap
                p: ({ children }) => <p className="mb-2">{children}</p>,
                ul: ({ children }) => <ul className="list-group list-group-flush ps-3 mb-2">{children}</ul>,
                ol: ({ children }) => <ol className="list-group list-group-flush ps-3 mb-2">{children}</ol>,
                li: ({ children }) => <li className="list-group-item border-0 p-0 ps-2 mb-1 bg-transparent">{children}</li>,
            }}
        >
            {content}
        </ReactMarkdown>
    );
};

export default MarkdownMessage;