"use client";

import React, { useState, useEffect } from "react";
import { 
  Save, 
  ArrowLeft, 
  Eye, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Heading1, 
  Quote, 
  List, 
  Minus, 
  AlertCircle 
} from "lucide-react";
import { Article } from "./ArticleManagement";

interface RichTextEditorProps {
  article: Article | null;
  onSave: (article: Article) => void;
  onCancel: () => void;
  categories: string[];
  authors: string[];
}

type BlockType = "paragraph" | "heading" | "quote" | "list" | "divider" | "callout" | "image";

interface EditorBlock {
  id: string;
  type: BlockType;
  value: string;
  extra?: string; // e.g. Image URL
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function RichTextEditor({ 
  article, 
  onSave, 
  onCancel, 
  categories, 
  authors 
}: RichTextEditorProps) {
  
  // Basic metadata fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [readingTime, setReadingTime] = useState("5 Min Read");
  const [status, setStatus] = useState<"Draft" | "Scheduled" | "Published">("Draft");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDesc, setSeoDesc] = useState("");
  
  // Block editor state
  const [blocks, setBlocks] = useState<EditorBlock[]>([
    { id: "1", type: "paragraph", value: "" }
  ]);

  const [uploadingImageId, setUploadingImageId] = useState<string | null>(null);

  // Sidebar show/hide preview
  const [showPreview, setShowPreview] = useState(true);

  // Sync edit values when editing an existing article
  useEffect(() => {
    const timer = setTimeout(() => {
      if (article) {
        setTitle(article.title);
        setSlug(article.slug);
        setCategory(article.category);
        setAuthor(article.author);
        setExcerpt(article.excerpt);
        setReadingTime(article.readingTime);
        setStatus(article.status);
        setSeoTitle(article.seoTitle || "");
        setSeoDesc(article.seoDesc || "");
        
        // Parse content to blocks if it exists, otherwise use a default paragraph block
        try {
          const parsed = JSON.parse(article.content);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setBlocks(parsed);
          } else {
            setBlocks([{ id: "1", type: "paragraph", value: article.content }]);
          }
        } catch {
          setBlocks([{ id: "1", type: "paragraph", value: article.content || "" }]);
        }
      } else {
        // Default initial states for new article
        setTitle("");
        setSlug("");
        setCategory(categories[0] || "Reflections");
        setAuthor(authors[0] || "Alistair Vance");
        setExcerpt("");
        setReadingTime("5 Min Read");
        setStatus("Draft");
        setSeoTitle("");
        setSeoDesc("");
        setBlocks([{ id: "1", type: "paragraph", value: "" }]);
      }
    }, 0);
    return () => clearTimeout(timer);
  }, [article, categories, authors]);

  // Block management functions
  const addBlock = (type: BlockType) => {
    const newBlock: EditorBlock = {
      id: Math.random().toString(),
      type,
      value: "",
      extra: type === "image" ? "https://lh3.googleusercontent.com/aida-public/AB6AXuDhX8qUCiTfZSN26eOcbboAAXYxuzANWuftg8n_HWZDKmbQLqe7gM0jQO3lkolFKVxHEQp7JmwssRCEUnvQl0m1SowUX0M6hlJSkhHJgGH0ZDH17Qu4-6sP0mIvCL68KaTPfBvSon9cVkya1a-5tNmzffOTOUEYHE8SedlKP3IgTfk2A5ZNmeGHnVMqZSglV443Mv15U9NgOza6U9NiDJJ8XwNQBERAhYzNYdh_FA41JJuJqTYTtc1aVr98TtZE2oZa0a6rlxyC9JNX" : undefined
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    if (blocks.length > 1) {
      setBlocks(blocks.filter(b => b.id !== id));
    }
  };

  const updateBlockValue = (id: string, val: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, value: val } : b));
  };

  const updateBlockExtra = (id: string, extraVal: string) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, extra: extraVal } : b));
  };

  const handleImageUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploadingImageId(id);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    try {
      const res = await fetch(`${API_URL}/api/upload`, { 
        method: "POST", 
        body: formData,
        credentials: "include"
      });
      const data = await res.json();
      if (data.url) updateBlockExtra(id, data.url);
      else throw new Error("No URL returned");
    } catch(err) {
      console.error(err);
      alert("Failed to upload image");
    } finally {
      setUploadingImageId(null);
    }
  };

  // Submit article
  const handleSave = () => {
    const updatedArticle: Article = {
      id: article ? article.id : Math.random().toString(),
      title,
      slug,
      category,
      author,
      excerpt,
      content: JSON.stringify(blocks), // serialize blocks
      tags: [category.toLowerCase()],
      readingTime,
      status,
      date: article ? article.date : new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      seoTitle: seoTitle || title,
      seoDesc: seoDesc || excerpt
    };
    onSave(updatedArticle);
  };

  return (
    <div className="space-y-6">
      {/* Top action row */}
      <div className="flex justify-between items-center border-b border-border-muted pb-4">
        <button
          onClick={onCancel}
          className="flex items-center space-x-2 text-cream/70 hover:text-cream font-sans text-xs uppercase tracking-widest transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Cancel</span>
        </button>

        <div className="flex space-x-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`border border-border-muted px-4 py-2 font-sans text-xs uppercase tracking-widest transition-all duration-300 flex items-center space-x-2 ${
              showPreview ? "bg-card-bg text-cream border-beige/40" : "text-cream/70 hover:text-cream"
            }`}
          >
            <Eye className="w-4 h-4" />
            <span>Live Preview</span>
          </button>

          <button
            onClick={handleSave}
            className="bg-beige text-charcoal hover:bg-cream hover:text-charcoal font-sans text-xs font-semibold uppercase tracking-widest px-6 py-2 flex items-center space-x-2 transition-colors duration-300"
          >
            <Save className="w-4 h-4" />
            <span>Save Essay</span>
          </button>
        </div>
      </div>

      {/* Editor Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Left Column: Notion-style Editor Block Panel (7 cols or 12 cols if preview is hidden) */}
        <div className={showPreview ? "xl:col-span-7 space-y-6" : "xl:col-span-12 space-y-6"}>
          
          {/* Metadata Block Card */}
          <div className="bg-card-bg/10 border border-border-muted p-6 space-y-4">
            <h4 className="font-serif text-lg italic text-cream border-b border-border-muted/30 pb-2">
              Article Meta Settings
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="font-sans text-[10px] uppercase tracking-wider text-cream/50">Title</label>
                <input
                  type="text"
                  placeholder="Finding Comfort in the In-Between"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (!article) {
                      setSlug(
                        e.target.value
                          .toLowerCase()
                          .replace(/[^a-z0-9]+/g, "-")
                          .replace(/(^-|-$)+/g, "")
                      );
                    }
                  }}
                  className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige placeholder-cream/30 transition-colors"
                />
              </div>

              {/* Slug */}
              <div className="space-y-1.5">
                <label className="font-sans text-[10px] uppercase tracking-wider text-cream/50">Slug</label>
                <input
                  type="text"
                  placeholder="finding-comfort-in-the-in-between"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige placeholder-cream/30 transition-colors"
                />
              </div>

              {/* Category */}
              <div className="space-y-1.5">
                <label className="font-sans text-[10px] uppercase tracking-wider text-cream/50">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige transition-colors"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Author */}
              <div className="space-y-1.5">
                <label className="font-sans text-[10px] uppercase tracking-wider text-cream/50">Author</label>
                <select
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige transition-colors"
                >
                  {authors.map((auth) => (
                    <option key={auth} value={auth}>{auth}</option>
                  ))}
                </select>
              </div>

              {/* Reading Time */}
              <div className="space-y-1.5">
                <label className="font-sans text-[10px] uppercase tracking-wider text-cream/50">Reading Time</label>
                <input
                  type="text"
                  placeholder="5 Min Read"
                  value={readingTime}
                  onChange={(e) => setReadingTime(e.target.value)}
                  className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige placeholder-cream/30 transition-colors"
                />
              </div>

              {/* Status */}
              <div className="space-y-1.5">
                <label className="font-sans text-[10px] uppercase tracking-wider text-cream/50">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "Draft" | "Scheduled" | "Published")}
                  className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige transition-colors"
                >
                  <option value="Draft">Draft</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Published">Published</option>
                </select>
              </div>

              {/* Excerpt */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="font-sans text-[10px] uppercase tracking-wider text-cream/50">Excerpt</label>
                <textarea
                  placeholder="Write a brief editorial intro..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  rows={2}
                  className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige placeholder-cream/30 transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Block Editor Content */}
          <div className="bg-card-bg/5 border border-border-muted p-6 space-y-4">
            <h4 className="font-serif text-lg italic text-cream border-b border-border-muted/30 pb-2">
              Notion Block Editor
            </h4>

            {/* Blocks Log */}
            <div className="space-y-4">
              {blocks.map((block) => (
                <div key={block.id} className="flex items-start space-x-2 group">
                  
                  {/* Block Delete indicator */}
                  <button
                    onClick={() => removeBlock(block.id)}
                    className="mt-2 text-cream/20 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete Block"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex-grow space-y-2">
                    {/* Paragraph Block */}
                    {block.type === "paragraph" && (
                      <textarea
                        value={block.value}
                        onChange={(e) => updateBlockValue(block.id, e.target.value)}
                        placeholder="Type paragraph text..."
                        rows={3}
                        className="w-full bg-charcoal text-cream border border-border-muted/60 rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige placeholder-cream/20 transition-colors"
                      />
                    )}

                    {/* Heading Block */}
                    {block.type === "heading" && (
                      <input
                        type="text"
                        value={block.value}
                        onChange={(e) => updateBlockValue(block.id, e.target.value)}
                        placeholder="Type Section Heading..."
                        className="w-full bg-charcoal text-cream border border-border-muted/60 font-serif text-base italic rounded-none px-3 py-2 focus:outline-none focus:border-beige placeholder-cream/20 transition-colors"
                      />
                    )}

                    {/* Quote Block */}
                    {block.type === "quote" && (
                      <textarea
                        value={block.value}
                        onChange={(e) => updateBlockValue(block.id, e.target.value)}
                        placeholder="Type editorial blockquote..."
                        rows={2}
                        className="w-full bg-charcoal text-cream border border-border-muted/60 font-serif italic text-sm text-beige rounded-none px-3 py-2 focus:outline-none focus:border-beige placeholder-beige/20 transition-colors"
                      />
                    )}

                    {/* Image Block */}
                    {block.type === "image" && (
                      <div className="border border-border-muted/60 p-4 space-y-2 bg-charcoal/30">
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={block.extra}
                            onChange={(e) => updateBlockExtra(block.id, e.target.value)}
                            placeholder="Image URL..."
                            className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-1 font-sans text-[10px] focus:outline-none focus:border-beige"
                          />
                          <div className="relative overflow-hidden shrink-0">
                            <button
                              type="button"
                              className="bg-beige/10 text-beige hover:bg-beige hover:text-charcoal border border-beige/30 transition-colors px-3 py-1 text-[10px] uppercase font-semibold h-full whitespace-nowrap"
                            >
                              {uploadingImageId === block.id ? "Uploading..." : "Upload File"}
                            </button>
                            <input
                              type="file"
                              accept="image/*"
                              disabled={uploadingImageId === block.id}
                              onChange={(e) => handleImageUpload(block.id, e)}
                              className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                            />
                          </div>
                        </div>
                        <input
                          type="text"
                          value={block.value}
                          onChange={(e) => updateBlockValue(block.id, e.target.value)}
                          placeholder="Image caption..."
                          className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-1 font-sans text-[10px] focus:outline-none focus:border-beige"
                        />
                      </div>
                    )}

                    {/* Divider Block */}
                    {block.type === "divider" && (
                      <div className="border border-border-muted/60 p-2 flex items-center justify-center bg-charcoal/20">
                        <span className="font-serif text-[10px] text-beige uppercase tracking-widest">--- Divider line ---</span>
                      </div>
                    )}

                    {/* Callout Block */}
                    {block.type === "callout" && (
                      <div className="flex space-x-2 items-start border border-beige/40 bg-beige/5 p-3">
                        <AlertCircle className="w-4 h-4 text-beige mt-0.5 flex-shrink-0" />
                        <textarea
                          value={block.value}
                          onChange={(e) => updateBlockValue(block.id, e.target.value)}
                          placeholder="Type callout note content..."
                          rows={2}
                          className="w-full bg-transparent text-cream border-0 focus:outline-none font-sans text-xs resize-none placeholder-cream/30"
                        />
                      </div>
                    )}

                    {/* Lists Block */}
                    {block.type === "list" && (
                      <textarea
                        value={block.value}
                        onChange={(e) => updateBlockValue(block.id, e.target.value)}
                        placeholder="Bullet list items (one per line)..."
                        rows={3}
                        className="w-full bg-charcoal text-cream border border-border-muted/60 rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige placeholder-cream/20 transition-colors"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Slash block inserter actions */}
            <div className="border-t border-border-muted/30 pt-4 flex flex-wrap gap-2">
              <button
                onClick={() => addBlock("paragraph")}
                className="border border-border-muted hover:border-beige/50 px-2.5 py-1 text-[10px] uppercase font-sans tracking-wider text-cream/70 hover:text-cream flex items-center space-x-1.5 transition-colors duration-300"
              >
                <Plus className="w-3 h-3" />
                <span>Paragraph</span>
              </button>
              <button
                onClick={() => addBlock("heading")}
                className="border border-border-muted hover:border-beige/50 px-2.5 py-1 text-[10px] uppercase font-sans tracking-wider text-cream/70 hover:text-cream flex items-center space-x-1.5 transition-colors duration-300"
              >
                <Heading1 className="w-3.5 h-3.5" />
                <span>Heading</span>
              </button>
              <button
                onClick={() => addBlock("quote")}
                className="border border-border-muted hover:border-beige/50 px-2.5 py-1 text-[10px] uppercase font-sans tracking-wider text-cream/70 hover:text-cream flex items-center space-x-1.5 transition-colors duration-300"
              >
                <Quote className="w-3 h-3" />
                <span>Blockquote</span>
              </button>
              <button
                onClick={() => addBlock("image")}
                className="border border-border-muted hover:border-beige/50 px-2.5 py-1 text-[10px] uppercase font-sans tracking-wider text-cream/70 hover:text-cream flex items-center space-x-1.5 transition-colors duration-300"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Image</span>
              </button>
              <button
                onClick={() => addBlock("divider")}
                className="border border-border-muted hover:border-beige/50 px-2.5 py-1 text-[10px] uppercase font-sans tracking-wider text-cream/70 hover:text-cream flex items-center space-x-1.5 transition-colors duration-300"
              >
                <Minus className="w-3.5 h-3.5" />
                <span>Divider</span>
              </button>
              <button
                onClick={() => addBlock("callout")}
                className="border border-border-muted hover:border-beige/50 px-2.5 py-1 text-[10px] uppercase font-sans tracking-wider text-cream/70 hover:text-cream flex items-center space-x-1.5 transition-colors duration-300"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Callout</span>
              </button>
              <button
                onClick={() => addBlock("list")}
                className="border border-border-muted hover:border-beige/50 px-2.5 py-1 text-[10px] uppercase font-sans tracking-wider text-cream/70 hover:text-cream flex items-center space-x-1.5 transition-colors duration-300"
              >
                <List className="w-3.5 h-3.5" />
                <span>List</span>
              </button>
            </div>
          </div>

          {/* SEO Block Settings */}
          <div className="bg-card-bg/10 border border-border-muted p-6 space-y-4">
            <h4 className="font-serif text-lg italic text-cream border-b border-border-muted/30 pb-2">
              SEO Page Settings
            </h4>
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="font-sans text-[10px] uppercase tracking-wider text-cream/50">SEO Page Title</label>
                <input
                  type="text"
                  placeholder="Finding Comfort in the In-Between - A Mind Full of Margins"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige placeholder-cream/30 transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-sans text-[10px] uppercase tracking-wider text-cream/50">Meta Description</label>
                <textarea
                  placeholder="Enter page meta description details for Google..."
                  value={seoDesc}
                  onChange={(e) => setSeoDesc(e.target.value)}
                  rows={2}
                  className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige placeholder-cream/30 transition-colors resize-none"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Print-Editorial Preview Panel (5 cols) */}
        {showPreview && (
          <div className="xl:col-span-5 space-y-6">
            <div className="border border-border-muted bg-charcoal p-8 sticky top-[80px] max-h-[85vh] overflow-y-auto select-text">
              <div className="text-center space-y-4 border-b border-border-muted/30 pb-8 mb-8">
                <span className="font-sans text-[9px] text-beige uppercase tracking-[0.25em] font-semibold">
                  {category || "Category"} • Live Preview
                </span>
                
                <h1 className="font-serif text-3xl font-normal leading-tight italic text-cream">
                  {title || "Untitled Article"}
                </h1>
                
                {excerpt && (
                  <p className="font-sans text-xs text-cream/70 leading-relaxed max-w-md mx-auto italic font-light">
                    {excerpt}
                  </p>
                )}

                <div className="flex justify-center items-center space-x-2 text-[10px] font-sans tracking-wider text-cream/40">
                  <span className="text-beige font-semibold">{author}</span>
                  <span>•</span>
                  <span>{readingTime}</span>
                </div>
              </div>

              {/* Dynamic rendering of blocks */}
              <div className="space-y-6 font-serif text-sm leading-relaxed text-cream/90 font-light">
                {blocks.map((block) => {
                  if (block.type === "paragraph" && block.value) {
                    return <p key={block.id} className="whitespace-pre-line text-justify">{block.value}</p>;
                  }
                  if (block.type === "heading" && block.value) {
                    return <h3 key={block.id} className="font-serif text-xl italic text-cream pt-4 border-b border-border-muted/10 pb-1">{block.value}</h3>;
                  }
                  if (block.type === "quote" && block.value) {
                    return (
                      <blockquote key={block.id} className="border-l-2 border-beige pl-4 py-1 my-4 font-serif italic text-beige text-base text-center bg-beige/5 pr-4">
                        “{block.value}”
                      </blockquote>
                    );
                  }
                  if (block.type === "image" && block.extra) {
                    return (
                      <figure key={block.id} className="my-6 space-y-1.5 border border-border-muted/20 p-2 bg-card-bg/10">
                        <div className="aspect-[16/10] bg-dark-bg relative overflow-hidden cinematic-overlay">
                          <img src={block.extra} alt={block.value} className="w-full h-full object-cover" />
                        </div>
                        {block.value && <figcaption className="font-sans text-[9px] text-cream/40 text-center uppercase tracking-widest">{block.value}</figcaption>}
                      </figure>
                    );
                  }
                  if (block.type === "divider") {
                    return <div key={block.id} className="w-16 h-[1px] bg-beige/30 mx-auto my-8" />;
                  }
                  if (block.type === "callout" && block.value) {
                    return (
                      <div key={block.id} className="flex space-x-2 items-start border border-beige/40 bg-beige/5 p-4 my-6">
                        <AlertCircle className="w-4 h-4 text-beige mt-0.5 flex-shrink-0" />
                        <p className="font-sans text-xs text-cream/80">{block.value}</p>
                      </div>
                    );
                  }
                  if (block.type === "list" && block.value) {
                    return (
                      <ul key={block.id} className="list-disc pl-5 space-y-1.5 font-sans text-xs text-cream/80 my-4">
                        {block.value.split("\n").filter(Boolean).map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
