"use client";

import React, { useState } from "react";
import { Trash2, Edit3, Palette } from "lucide-react";

interface Category {
  id: string;
  name: string;
  count: string;
  desc: string;
  color: string;
  image: string;
}

export default function CategoryManagement() {
  const [categories, setCategories] = useState<Category[]>([
    { id: "1", name: "Reflections", count: "14 Essays", desc: "Introspective essays on memory and time.", color: "#A98D7B", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCSlY5u3zZwsyg8ExocyGG7c1Ddd6CmL7IEpv9i0DwRsCycfhepbdRuzIHkaXWtAmsUlMyb8GCLqZW9MxAkDQhEKrMkzwLA3qXXk7B4UlO3_CuI0-he5OrY1plcg5nzbaJu-OuMLtsD-tP3UB5ONmQILh9X4AHs-G56qTRF736GGeMhfFehINze2orVq10vckgmHmSbcnrBmJaJVVp6eaR4qQRMRjIKzPr9_cI-lforq8CSss7oZ5Jz5ELRaSGNN631mVkTgH6bUJH-" },
    { id: "2", name: "Creativity", count: "9 Essays", desc: "Exploring literary and photographic arts.", color: "#cec5bc", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxC-4qWt553XCeI03wG65RF3JId2cHBmFzPt_2qdWOyI5byegwitM2YJRw-FZE3dEChGLVS5V5w1-Q-SYhlAV-R1S5gDXlm9kxoeAm4A7XWyCCVW0hrSI276-uA3SFkas4VZg6SbIuWbeVuib2gkw0NYV3rba1JerJ6NUiuRotmRyM_T1uSxL72ZQIvotsrc9KLFZkpUQSJAO3uWq1LAGdhyAZJrQLooGsY9vNx5aTM_I6RkW3hT-5Qnqp85hAKWL0MAQK2mfeWVT8" },
    { id: "3", name: "Slow Living", count: "15 Essays", desc: "Finding sanctuary in simple daily routines.", color: "#A98D7B", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuse4nEgc7Vst5D6QL94HEB-rJXFC5npPw-6kw1OXLfP_hP9X-PFWhFr3wDRuQ-UkWHIPluHvSBGHJSXxYsbG9Uk5-ydGi9DjKuMQcOdkWqHTB2sgFvyUq9ub5VKI4tt6OHgK-mILqkvvgmysxTpB_j97aVtjchJVI5gUYYI-418Sr-4_5bDhfzJXDEgzWSbs1Om-sohcGBP2cdmXd3QYQaGE9sionQzjLD6HDEEzPsc-p0ovz5TUDh7kk4" },
    { id: "4", name: "Relationships", count: "10 Essays", desc: "Deep connections, apologies, and silence.", color: "#cec5bc", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDo48flFPWh_ZuH-eY3jQX0ouNTngrTniP472zOeib3qJu25LHJ2YZLp7DJQ_z3kPyThiOr9j0aZng_tZIiIgkrDDt5_HLVVXMCCMPxP7_lSs_asyrMpzos9p8kkI4cSnwC9nQx44xNV_kiMXxqCST_MiTu1iWhXAti92nldZ4OvPL2wKVAkrw6AJ127ydd0XqN7Ort6E5oUTo-SQmkDP8bwDV6tD7lSxtGLsrH6zpQCsvTlvTKaR9Iw60t3cBFql365mzyl-sj6fZ6" },
  ]);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [color, setColor] = useState("#A98D7B");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    if (editingId) {
      setCategories(categories.map(cat => cat.id === editingId ? { ...cat, name, desc, color } : cat));
      setEditingId(null);
    } else {
      const newCat: Category = {
        id: Math.random().toString(),
        name,
        count: "0 Essays",
        desc,
        color,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAd5hbeEys4swuXyv-km07QcTtbRv6-5_lLKSPD_OOmHm_7J74GfSjobMxj1gwwarW7Fka_JgewkrhbKiE5AV_w7sojt6rJeBJ8rU_xAoNhKK-u4cgdCr_qoypokzNNKcbeBNNIJRA_mP2Gg9_VF081Sz_uPa6YDldNiOUxzAGDrl2Bj9AfP6xC3RiSOCkDDmqCru71ma2mZSrh9QOOwJEPRww59Knj1XbvIws3O3EdqE7X-bDyQDXdI4FFADUFYkaW2qubW4FSmG9J"
      };
      setCategories([...categories, newCat]);
    }

    setName("");
    setDesc("");
    setColor("#A98D7B");
  };

  const handleEdit = (cat: Category) => {
    setEditingId(cat.id);
    setName(cat.name);
    setDesc(cat.desc);
    setColor(cat.color);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <span className="font-sans text-[10px] text-beige uppercase tracking-[0.2em] font-semibold block mb-1">
          Collections Taxonomy
        </span>
        <h2 className="font-serif text-3xl font-normal italic text-cream">
          Manage Categories
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Create / Edit Form (4 cols) */}
        <div className="lg:col-span-4 border border-border-muted bg-card-bg/10 p-6 space-y-4 h-fit">
          <h4 className="font-serif text-lg italic text-cream border-b border-border-muted/30 pb-2">
            {editingId ? "Edit Category" : "Create Category"}
          </h4>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">Category Name</label>
              <input
                type="text"
                placeholder="e.g. Philosophy"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige placeholder-cream/30 transition-colors"
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">Description</label>
              <textarea
                placeholder="Describe this category context..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={3}
                className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige placeholder-cream/30 transition-colors resize-none"
              />
            </div>

            {/* Accent Color picker */}
            <div className="space-y-1.5">
              <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40 flex items-center space-x-1">
                <Palette className="w-3.5 h-3.5 text-beige" />
                <span>Accent Color</span>
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-8 h-8 bg-transparent border border-border-muted cursor-pointer rounded-none"
                />
                <input
                  type="text"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="bg-charcoal text-cream border border-border-muted rounded-none px-3 py-1.5 font-sans text-xs w-28 uppercase focus:outline-none"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                className="flex-grow bg-beige text-charcoal hover:bg-cream hover:text-charcoal font-sans text-xs font-semibold uppercase tracking-widest py-2.5 transition-colors duration-300 shadow-md"
              >
                {editingId ? "Update" : "Create"}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setName("");
                    setDesc("");
                    setColor("#A98D7B");
                  }}
                  className="px-4 border border-border-muted hover:border-cream/30 text-cream/70 hover:text-cream font-sans text-xs uppercase tracking-widest transition-colors duration-300"
                >
                  Cancel
                </button>
              )}
            </div>

          </form>
        </div>

        {/* Right Side: Grid log of categories (8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              className="border border-border-muted bg-card-bg/25 flex flex-col justify-between hover:border-beige/30 transition-all duration-300 group overflow-hidden relative"
            >
              <div className="card-hover-overlay" />
              {/* Category Header Info */}
              <div className="p-6 space-y-3 relative z-10">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-2">
                    <span 
                      className="w-3 h-3 border"
                      style={{ backgroundColor: cat.color, borderColor: cat.color }}
                    />
                    <h3 className="font-serif text-lg font-normal italic text-cream group-hover:text-beige transition-colors duration-300">
                      {cat.name}
                    </h3>
                  </div>
                  <span className="font-sans text-[9px] uppercase tracking-wider text-beige border border-beige/20 px-2 py-0.5 bg-beige/5">
                    {cat.count}
                  </span>
                </div>
                <p className="font-sans text-xs text-cream/60 leading-relaxed font-light">
                  {cat.desc}
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="border-t border-border-muted/30 px-6 py-3 bg-charcoal/20 flex justify-end space-x-4 relative z-10">
                <button
                  onClick={() => handleEdit(cat)}
                  className="text-cream/50 hover:text-beige text-[10px] uppercase font-sans tracking-widest font-bold flex items-center space-x-1 transition-colors duration-300"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDelete(cat.id)}
                  className="text-cream/50 hover:text-red-400 text-[10px] uppercase font-sans tracking-widest font-bold flex items-center space-x-1 transition-colors duration-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
