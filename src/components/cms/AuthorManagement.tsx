"use client";

import React, { useState } from "react";
import { Trash2, Edit3 } from "lucide-react";

interface Author {
  id: string;
  name: string;
  bio: string;
  photo: string;
  twitter: string;
  instagram: string;
}

export default function AuthorManagement() {
  const [authors, setAuthors] = useState<Author[]>([
    {
      id: "1",
      name: "Alistair Vance",
      bio: "Founding editor and essayist focusing on slow listening, classical phenomenology, and local aesthetic histories.",
      photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAd5hbeEys4swuXyv-km07QcTtbRv6-5_lLKSPD_OOmHm_7J74GfSjobMxj1gwwarW7Fka_JgewkrhbKiE5AV_w7sojt6rJeBJ8rU_xAoNhKK-u4cgdCr_qoypokzNNKcbeBNNIJRA_mP2Gg9_VF081Sz_uPa6YDldNiOUxzAGDrl2Bj9AfP6xC3RiSOCkDDmqCru71ma2mZSrh9QOOwJEPRww59Knj1XbvIws3O3EdqE7X-bDyQDXdI4FFADUFYkaW2qubW4FSmG9J",
      twitter: "https://twitter.com/alistairv",
      instagram: "https://instagram.com/alistairv",
    },
    {
      id: "2",
      name: "Rishika Shukla",
      bio: "Feature writer exploring introspection, apologies, journal rituals, and relationships in modern metropolitan spaces.",
      photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAd5hbeEys4swuXyv-km07QcTtbRv6-5_lLKSPD_OOmHm_7J74GfSjobMxj1gwwarW7Fka_JgewkrhbKiE5AV_w7sojt6rJeBJ8rU_xAoNhKK-u4cgdCr_qoypokzNNKcbeBNNIJRA_mP2Gg9_VF081Sz_uPa6YDldNiOUxzAGDrl2Bj9AfP6xC3RiSOCkDDmqCru71ma2mZSrh9QOOwJEPRww59Knj1XbvIws3O3EdqE7X-bDyQDXdI4FFADUFYkaW2qubW4FSmG9J",
      twitter: "https://twitter.com/rishikas",
      instagram: "https://instagram.com/rishikas",
    },
    {
      id: "3",
      name: "Eleanor Thorne",
      bio: "Philosopher and poet investigating impermanence, season shifts, stoic practices, and the value of blank cotton margins.",
      photo: "https://lh3.googleusercontent.com/aida-public/AB6AXuAd5hbeEys4swuXyv-km07QcTtbRv6-5_lLKSPD_OOmHm_7J74GfSjobMxj1gwwarW7Fka_JgewkrhbKiE5AV_w7sojt6rJeBJ8rU_xAoNhKK-u4cgdCr_qoypokzNNKcbeBNNIJRA_mP2Gg9_VF081Sz_uPa6YDldNiOUxzAGDrl2Bj9AfP6xC3RiSOCkDDmqCru71ma2mZSrh9QOOwJEPRww59Knj1XbvIws3O3EdqE7X-bDyQDXdI4FFADUFYkaW2qubW4FSmG9J",
      twitter: "https://twitter.com/eleanor_t",
      instagram: "https://instagram.com/eleanor_t",
    },
  ]);

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [photo, setPhoto] = useState("https://lh3.googleusercontent.com/aida-public/AB6AXuAd5hbeEys4swuXyv-km07QcTtbRv6-5_lLKSPD_OOmHm_7J74GfSjobMxj1gwwarW7Fka_JgewkrhbKiE5AV_w7sojt6rJeBJ8rU_xAoNhKK-u4cgdCr_qoypokzNNKcbeBNNIJRA_mP2Gg9_VF081Sz_uPa6YDldNiOUxzAGDrl2Bj9AfP6xC3RiSOCkDDmqCru71ma2mZSrh9QOOwJEPRww59Knj1XbvIws3O3EdqE7X-bDyQDXdI4FFADUFYkaW2qubW4FSmG9J");
  const [twitter, setTwitter] = useState("");
  const [instagram, setInstagram] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    if (editingId) {
      setAuthors(authors.map(a => a.id === editingId ? { ...a, name, bio, photo, twitter, instagram } : a));
      setEditingId(null);
    } else {
      const newAuthor: Author = {
        id: Math.random().toString(),
        name,
        bio,
        photo,
        twitter,
        instagram
      };
      setAuthors([...authors, newAuthor]);
    }

    setName("");
    setBio("");
    setTwitter("");
    setInstagram("");
  };

  const handleEdit = (a: Author) => {
    setEditingId(a.id);
    setName(a.name);
    setBio(a.bio);
    setPhoto(a.photo);
    setTwitter(a.twitter);
    setInstagram(a.instagram);
  };

  const handleDelete = (id: string) => {
    setAuthors(authors.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <span className="font-sans text-[10px] text-beige uppercase tracking-[0.2em] font-semibold block mb-1">
          Masthead Creators
        </span>
        <h2 className="font-serif text-3xl font-normal italic text-cream">
          Manage Authors
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Create / Edit Form (4 cols) */}
        <div className="lg:col-span-4 border border-border-muted bg-card-bg/10 p-6 space-y-4 h-fit">
          <h4 className="font-serif text-lg italic text-cream border-b border-border-muted/30 pb-2">
            {editingId ? "Edit Author Profile" : "Register Author"}
          </h4>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">Full Name</label>
              <input
                type="text"
                placeholder="e.g. Alistair Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige placeholder-cream/30 transition-colors"
                required
              />
            </div>

            {/* Biography */}
            <div className="space-y-1.5">
              <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">Biography</label>
              <textarea
                placeholder="Write author bio..."
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige placeholder-cream/30 transition-colors resize-none"
              />
            </div>

            {/* Social Twitter */}
            <div className="space-y-1.5">
              <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">Twitter Profile Link</label>
              <input
                type="text"
                placeholder="https://twitter.com/username"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige placeholder-cream/30 transition-colors"
              />
            </div>

            {/* Social Instagram */}
            <div className="space-y-1.5">
              <label className="font-sans text-[10px] uppercase tracking-wider text-cream/40">Instagram Profile Link</label>
              <input
                type="text"
                placeholder="https://instagram.com/username"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full bg-charcoal text-cream border border-border-muted rounded-none px-3 py-2 font-sans text-xs focus:outline-none focus:border-beige placeholder-cream/30 transition-colors"
              />
            </div>

            {/* Buttons */}
            <div className="flex space-x-3 pt-2">
              <button
                type="submit"
                className="flex-grow bg-beige text-charcoal hover:bg-cream hover:text-charcoal font-sans text-xs font-semibold uppercase tracking-widest py-2.5 transition-colors duration-300 shadow-md"
              >
                {editingId ? "Update Profile" : "Add Author"}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setName("");
                    setBio("");
                    setTwitter("");
                    setInstagram("");
                  }}
                  className="px-4 border border-border-muted hover:border-cream/30 text-cream/70 hover:text-cream font-sans text-xs uppercase tracking-widest transition-colors duration-300"
                >
                  Cancel
                </button>
              )}
            </div>

          </form>
        </div>

        {/* Right Side: Grid list of authors (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {authors.map((auth) => (
            <div 
              key={auth.id}
              className="border border-border-muted bg-card-bg/25 p-6 flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 hover:border-beige/30 transition-all duration-300 group overflow-hidden relative"
            >
              <div className="card-hover-overlay" />
              {/* Photo */}
              <div className="w-20 h-20 rounded-full overflow-hidden border border-border-muted bg-beige/10 flex-shrink-0 relative cinematic-overlay">
                <img src={auth.photo} alt={auth.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 card-image-transition" />
              </div>

              {/* Bio Details */}
              <div className="flex-grow space-y-3 relative z-10 text-center md:text-left">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <h3 className="font-serif text-xl font-normal italic text-cream group-hover:text-beige transition-colors duration-300">
                    {auth.name}
                  </h3>
                  <div className="flex space-x-3 text-beige mt-2 md:mt-0 text-xs font-sans tracking-wide">
                    {auth.twitter && <a href={auth.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">Twitter</a>}
                    {auth.instagram && <a href={auth.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-cream transition-colors">Instagram</a>}
                  </div>
                </div>
                <p className="font-sans text-xs text-cream/70 leading-relaxed font-light">
                  {auth.bio}
                </p>
                
                {/* Actions */}
                <div className="flex justify-center md:justify-start space-x-4 pt-2 border-t border-border-muted/20">
                  <button
                    onClick={() => handleEdit(auth)}
                    className="text-cream/40 hover:text-beige text-[10px] uppercase font-sans tracking-widest font-bold flex items-center space-x-1 transition-colors duration-300"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={() => handleDelete(auth.id)}
                    className="text-cream/40 hover:text-red-400 text-[10px] uppercase font-sans tracking-widest font-bold flex items-center space-x-1 transition-colors duration-300"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete Profile</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
