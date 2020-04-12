import React, { useState } from 'react';

interface ArticleProps {
    title: string,
    content: string
}

const Article: React.FC<ArticleProps> = ({ title, content }) => {
    const [article, setArticle] = useState<ArticleProps>({ title, content });

    return (
        <div>
            <p>Title: {article.title}</p>
            <section>{article.content}</section>
            <button onClick={() => setArticle({
                title: '下一篇',
                content: '下一篇的内容'
            })}>下一篇</button>
        </div>
    )
}

export default Article;