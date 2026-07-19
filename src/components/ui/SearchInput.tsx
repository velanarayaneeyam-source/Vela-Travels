"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SearchInputProps {
    defaultValue?: string;
    placeholder?: string;
    className?: string;
    variant?: 'dark' | 'light'; // dark = admin, light = public tours page
}

export const SearchInput = ({
    defaultValue = "",
    placeholder = "Search destinations...",
    className = "",
    variant = 'light',
}: SearchInputProps) => {
    const router = useRouter();
    const [value, setValue] = useState(defaultValue || "");
    const [isFocused, setIsFocused] = useState(false);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (defaultValue !== undefined) {
            setValue(defaultValue);
        }
    }, [defaultValue]);

    const applySearch = (searchValue: string) => {
        const url = new URL(window.location.href);
        if (searchValue.trim()) {
            url.searchParams.set('search', searchValue.trim());
        } else {
            url.searchParams.delete('search');
        }
        router.push(url.pathname + url.search);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            applySearch(newValue);
        }, 400);
    };

    const handleClear = () => {
        setValue("");
        applySearch("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            applySearch(value);
        }
        if (e.key === 'Escape') {
            handleClear();
        }
    };

    return (
        <motion.div 
            initial={false}
            animate={{ 
                scale: isFocused ? 1.02 : 1,
                boxShadow: isFocused ? "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" : "0 0px 0px 0px transparent"
            }}
            className={cn(
                "relative flex items-center transition-all duration-300 rounded-2xl group",
                variant === 'light' 
                    ? "bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200 dark:border-white/10" 
                    : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-white/5",
                isFocused && "border-primary/50 dark:border-primary/50 ring-4 ring-primary/5",
                className
            )}
        >
            <div className="pl-4 text-slate-400 group-hover:text-primary transition-colors">
                <Search className="w-5 h-5" />
            </div>
            
            <input
                type="text"
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="w-full py-4 px-3 bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 outline-none font-medium text-sm"
            />

            {value && (
                <button
                    type="button"
                    onClick={handleClear}
                    className="p-2 mr-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-400 hover:text-red-500 transition-all"
                >
                    <X className="w-4 h-4" />
                </button>
            )}

            {/* Premium Bottom Glow Effect */}
            {isFocused && (
                <motion.div 
                    layoutId="glow"
                    className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent"
                />
            )}
        </motion.div>
    );
};
