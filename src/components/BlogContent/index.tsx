import { GetPostSlug200 } from "@/src/services/model";
import './index.css'; 

interface BlogContentProps {
    content: GetPostSlug200;
}

export default function BlogContent({ content }: BlogContentProps) {
    
    const sanitizedContent = content?.data?.content ?? '';

    return (
        <div className="max-w-4xl mx-auto px-4">
            <div className="block w-full h-full blog-content">
                <h1 className="">{content?.data?.title}</h1>
                <div 
                    dangerouslySetInnerHTML={{ __html: sanitizedContent }} 
                />
            </div>
        </div>
    )
}