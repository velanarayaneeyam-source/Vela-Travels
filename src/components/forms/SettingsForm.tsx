"use client";

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { saveSiteSettings } from '@/lib/actions';
import { Save, Phone, Mail, MapPin, Type, MessageCircle, Upload, Image as ImageIcon, Car, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SettingsForm = ({ initialSettings }: { initialSettings: Record<string, string> }) => {
    const [settings, setSettings] = useState(initialSettings);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [previewUrl, setPreviewUrl] = useState(initialSettings.logoUrl || "/logo-v4.png");
    const [heroPreviewUrl, setHeroPreviewUrl] = useState(initialSettings.heroImageUrl || "/hero-traveller.png");
    const [homeVehicle1PreviewUrl, setHomeVehicle1PreviewUrl] = useState(initialSettings.homeVehicle1Image || "/premium-car.png");
    const [homeVehicle2PreviewUrl, setHomeVehicle2PreviewUrl] = useState(initialSettings.homeVehicle2Image || "/hero-traveller.png");
    const [v1Gallery, setV1Gallery] = useState<string[]>(initialSettings.homeVehicle1Gallery ? initialSettings.homeVehicle1Gallery.split(',') : []);
    const [v2Gallery, setV2Gallery] = useState<string[]>(initialSettings.homeVehicle2Gallery ? initialSettings.homeVehicle2Gallery.split(',') : []);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const heroFileInputRef = useRef<HTMLInputElement>(null);
    const homeVehicle1FileInputRef = useRef<HTMLInputElement>(null);
    const homeVehicle2FileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleHeroFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setHeroPreviewUrl(url);
        }
    };

    const handleHomeVehicle1FileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setHomeVehicle1PreviewUrl(url);
        }
    };

    const handleHomeVehicle2FileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setHomeVehicle2PreviewUrl(url);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const formData = new FormData(e.currentTarget);
            // Ensure logoUrl is passed if no new file is selected
            if (!formData.get("logo-file") || (formData.get("logo-file") as File).size === 0) {
                formData.set("logo-url", initialSettings.logoUrl || "/logo-v4.png");
            }
            if (!formData.get("hero-file") || (formData.get("hero-file") as File).size === 0) {
                formData.set("hero-url", initialSettings.heroImageUrl || "/hero-traveller.png");
            }

            if (!formData.get("home-vehicle-1-file") || (formData.get("home-vehicle-1-file") as File).size === 0) {
                formData.set("home-vehicle-1-url", initialSettings.homeVehicle1Image || "/premium-car.png");
            }
            if (!formData.get("home-vehicle-2-file") || (formData.get("home-vehicle-2-file") as File).size === 0) {
                formData.set("home-vehicle-2-url", initialSettings.homeVehicle2Image || "/hero-traveller.png");
            }

            const result = await saveSiteSettings(formData);
            
            if (result.success) {
                setMessage("Settings saved successfully!");
                if (result.logoUrl) {
                    setPreviewUrl(result.logoUrl);
                }
                if (result.heroImageUrl) {
                    setHeroPreviewUrl(result.heroImageUrl);
                }
                if (result.homeVehicle1Image) {
                    setHomeVehicle1PreviewUrl(result.homeVehicle1Image);
                }
                if (result.homeVehicle2Image) {
                    setHomeVehicle2PreviewUrl(result.homeVehicle2Image);
                }
                setTimeout(() => setMessage(""), 3000);
            } else {
                setMessage(result.error || "Error saving settings.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Error saving settings.");
        } finally {
            setLoading(false);
        }
    };

    const sections = [
        {
            title: "Contact Information",
            icon: Phone,
            fields: [
                { key: "phone", label: "Phone Number", type: "text", icon: Phone, placeholder: "+91 92070 50525" },
                { key: "whatsapp", label: "WhatsApp Number (Direct Link)", type: "text", icon: MessageCircle, placeholder: "919207050525" },
                { key: "email", label: "Email Address", type: "email", icon: Mail, placeholder: "velatravelsnmra@gmail.com" },
                { key: "address", label: "Office Address", type: "textarea", icon: MapPin, placeholder: "Aliyur, Near NSS College, Nenmara, Palakkad 678508" },
            ]
        },
        {
            title: "Hero Section",
            icon: Type,
            fields: [
                { key: "heroImage", label: "Hero Background Image", type: "image", icon: ImageIcon },
                { key: "heroTitle", label: "Hero Title", type: "text", icon: Type, placeholder: "Vela Travels | Premium Vehicle Rent & Tours" },
                { key: "heroSubtitle", label: "Hero Subtitle", type: "textarea", icon: Type, placeholder: "Travel together in comfort and style. Whether it's a family getaway, corporate trip, or group tour, we provide the perfect vehicles for your journey." },
            ]
        },

        {
            title: "Homepage Featured Vehicles",
            icon: Car,
            fields: [
                { key: "homeVehicle1Image", label: "Vehicle 1 Image (Premium SUV)", type: "image", icon: ImageIcon },
                { key: "homeVehicle2Image", label: "Vehicle 2 Image (Force Traveller)", type: "image", icon: ImageIcon },
            ]
        },
        {
            title: "Footer Content",
            icon: Type,
            fields: [
                { key: "footerTagline", label: "Footer Tagline / Description", type: "textarea", icon: Type, placeholder: "Connecting you to the most beautiful destinations around the world. Your trusted travel partner since 2015." },
                { key: "footerDestinations", label: "Destinations (comma separated)", type: "textarea", icon: MapPin, placeholder: "Premium Rentals, Ayurveda Retreats, Sightseeing Tours, Houseboat Stays" },
                { key: "footerCopyright", label: "Copyright Text", type: "text", icon: Type, placeholder: "© 2026 Vela Travels. All rights reserved." },
            ]
        },
        {
            title: "Social Media Links",
            icon: MessageCircle,
            fields: [
                { key: "socialInstagram", label: "Instagram URL", type: "text", icon: MessageCircle, placeholder: "https://instagram.com/velatravels" },
                { key: "socialFacebook", label: "Facebook URL", type: "text", icon: MessageCircle, placeholder: "https://facebook.com/velatravels" },
                { key: "socialTwitter", label: "Twitter / X URL", type: "text", icon: MessageCircle, placeholder: "https://twitter.com/velatravels" },
            ]
        },
        {
            title: "Map Integration",
            icon: MapPin,
            fields: [
                { key: "googleMapsEmbed", label: "Google Maps Embed URL", type: "textarea", icon: MapPin, placeholder: "https://www.google.com/maps/embed?..." },
            ]
        }
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
                <div className={`p-4 rounded-xl font-bold text-center fixed top-24 right-8 z-50 shadow-2xl min-w-[300px] animate-in slide-in-from-right-8 duration-300 ${message.includes('Error') ? 'bg-red-500 text-white' : 'bg-primary text-white'}`}>
                    {message}
                </div>
            )}

            {/* Branding Section */}
            <div className="glass p-8 rounded-[2rem] space-y-6 mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <ImageIcon className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold">Branding & Logo</h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Current Logo Preview</label>
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-white/5 flex items-center justify-center p-4 group">
                            <img 
                                src={previewUrl} 
                                alt="Logo Preview" 
                                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110 rounded-2xl" 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <p className="text-white text-[10px] font-black uppercase tracking-tighter">Live Preview</p>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Upload New Logo</label>
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="cursor-pointer border-2 border-dashed border-white/10 hover:border-primary/50 rounded-2xl p-8 transition-all group flex flex-col items-center justify-center gap-3 bg-slate-950/30"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <Upload className="w-6 h-6" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-bold text-white">Click to upload brand logo</p>
                                    <p className="text-xs text-slate-500">Supports PNG, JPG, WEBP (Max 5MB)</p>
                                </div>
                                <input 
                                    ref={fileInputRef}
                                    type="file" 
                                    name="logo-file"
                                    accept="image/*"
                                    className="hidden" 
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sections.map((section) => (
                    <div key={section.title} className="glass p-8 rounded-[2rem] space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <section.icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold">{section.title}</h3>
                        </div>

                        <div className="space-y-4">
                            {section.fields.map((field) => (
                                <div key={field.key} className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">{field.label}</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-4 text-slate-500 group-focus-within:text-primary transition-colors">
                                            <field.icon className="w-5 h-5" />
                                        </div>
                                        {field.type === 'textarea' ? (
                                            <textarea
                                                name={field.key}
                                                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all min-h-[100px] placeholder:text-slate-600"
                                                value={settings[field.key] || ""}
                                                onChange={(e) => handleChange(field.key, e.target.value)}
                                                placeholder={field.placeholder}
                                            />
                                        ) : field.type === 'image' && field.key === 'heroImage' ? (
                                            <div className="pl-12 pr-4 pb-4">
                                                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950/50 border border-white/5 flex items-center justify-center p-2 group mb-4">
                                                    <img 
                                                        src={heroPreviewUrl} 
                                                        alt="Hero Preview" 
                                                        className="max-h-full max-w-full object-cover transition-transform duration-500 rounded-xl" 
                                                    />
                                                </div>
                                                <div 
                                                    onClick={() => heroFileInputRef.current?.click()}
                                                    className="cursor-pointer border border-dashed border-white/10 hover:border-primary/50 rounded-xl p-4 transition-all flex items-center justify-center gap-3 bg-slate-950/30"
                                                >
                                                    <Upload className="w-5 h-5 text-primary" />
                                                    <span className="text-sm font-bold text-white">Upload New Hero Image</span>
                                                    <input 
                                                        ref={heroFileInputRef}
                                                        type="file" 
                                                        name="hero-file"
                                                        accept="image/*"
                                                        className="hidden" 
                                                        onChange={handleHeroFileChange}
                                                    />
                                                </div>
                                            </div>


                                        ) : field.type === 'image' && field.key === 'homeVehicle1Image' ? (
                                            <div className="pl-12 pr-4 pb-4">
                                                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950/50 border border-white/5 flex items-center justify-center p-2 group mb-4">
                                                    <img 
                                                        src={homeVehicle1PreviewUrl} 
                                                        alt="Vehicle 1 Preview" 
                                                        className="max-h-full max-w-full object-cover transition-transform duration-500 rounded-xl" 
                                                    />
                                                </div>
                                                <div 
                                                    onClick={() => homeVehicle1FileInputRef.current?.click()}
                                                    className="cursor-pointer border border-dashed border-white/10 hover:border-primary/50 rounded-xl p-4 transition-all flex items-center justify-center gap-3 bg-slate-950/30"
                                                >
                                                    <Upload className="w-5 h-5 text-primary" />
                                                    <span className="text-sm font-bold text-white">Upload Vehicle 1 Image</span>
                                                    <input 
                                                        ref={homeVehicle1FileInputRef}
                                                        type="file" 
                                                        name="home-vehicle-1-file"
                                                        accept="image/*"
                                                        className="hidden" 
                                                        onChange={handleHomeVehicle1FileChange}
                                                    />
                                                </div>
                                                <div className="mt-4">
                                                    <label className="text-xs font-bold text-slate-400 mb-2 block">Upload Multiple Gallery Images</label>
                                                    <input 
                                                        type="file" 
                                                        name="home-vehicle-1-gallery"
                                                        accept="image/*"
                                                        multiple
                                                        className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
                                                    />
                                                    <input type="hidden" name="home-vehicle-1-gallery-url" value={v1Gallery.join(',')} />
                                                    
                                                    {v1Gallery.length > 0 && (
                                                        <div className="mt-3 flex flex-wrap gap-2">
                                                            {v1Gallery.map((url, idx) => (
                                                                <div key={idx} className="relative group w-20 h-16 rounded-lg overflow-hidden border border-white/10">
                                                                    <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                                                                    <button 
                                                                        type="button" 
                                                                        onClick={() => setV1Gallery(prev => prev.filter((_, i) => i !== idx))}
                                                                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 rounded-full p-1 shadow-lg transition-colors"
                                                                    >
                                                                        <X className="w-3 h-3 text-white" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : field.type === 'image' && field.key === 'homeVehicle2Image' ? (
                                            <div className="pl-12 pr-4 pb-4">
                                                <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-950/50 border border-white/5 flex items-center justify-center p-2 group mb-4">
                                                    <img 
                                                        src={homeVehicle2PreviewUrl} 
                                                        alt="Vehicle 2 Preview" 
                                                        className="max-h-full max-w-full object-cover transition-transform duration-500 rounded-xl" 
                                                    />
                                                </div>
                                                <div 
                                                    onClick={() => homeVehicle2FileInputRef.current?.click()}
                                                    className="cursor-pointer border border-dashed border-white/10 hover:border-primary/50 rounded-xl p-4 transition-all flex items-center justify-center gap-3 bg-slate-950/30"
                                                >
                                                    <Upload className="w-5 h-5 text-primary" />
                                                    <span className="text-sm font-bold text-white">Upload Vehicle 2 Image</span>
                                                    <input 
                                                        ref={homeVehicle2FileInputRef}
                                                        type="file" 
                                                        name="home-vehicle-2-file"
                                                        accept="image/*"
                                                        className="hidden" 
                                                        onChange={handleHomeVehicle2FileChange}
                                                    />
                                                </div>
                                                <div className="mt-4">
                                                    <label className="text-xs font-bold text-slate-400 mb-2 block">Upload Multiple Gallery Images</label>
                                                    <input 
                                                        type="file" 
                                                        name="home-vehicle-2-gallery"
                                                        accept="image/*"
                                                        multiple
                                                        className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
                                                    />
                                                    <input type="hidden" name="home-vehicle-2-gallery-url" value={v2Gallery.join(',')} />
                                                    
                                                    {v2Gallery.length > 0 && (
                                                        <div className="mt-3 flex flex-wrap gap-2">
                                                            {v2Gallery.map((url, idx) => (
                                                                <div key={idx} className="relative group w-20 h-16 rounded-lg overflow-hidden border border-white/10">
                                                                    <img src={url} alt="Gallery" className="w-full h-full object-cover" />
                                                                    <button 
                                                                        type="button" 
                                                                        onClick={() => setV2Gallery(prev => prev.filter((_, i) => i !== idx))}
                                                                        className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 rounded-full p-1 shadow-lg transition-colors"
                                                                    >
                                                                        <X className="w-3 h-3 text-white" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <input
                                                name={field.key}
                                                type={field.type}
                                                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all placeholder:text-slate-600"
                                                value={settings[field.key] || ""}
                                                onChange={(e) => handleChange(field.key, e.target.value)}
                                                placeholder={field.placeholder}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end sticky bottom-8 z-40">
                <Button type="submit" size="lg" disabled={loading} className="gap-2 px-10 shadow-2xl shadow-primary/20">
                    <Save className="w-5 h-5" />
                    {loading ? "Saving..." : "Save All Settings"}
                </Button>
            </div>
        </form>
    );
};
