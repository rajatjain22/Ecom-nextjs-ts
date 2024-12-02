"use client";

import React, { useState, useRef, useEffect } from "react";
import useOnClickOutside from "@/hooks/useOnClickOutside";
import Input from "./Input";

interface AutocompleteProps {
  id: string;
  label?: string;
  inputSize?: string;
  name: string;
  placeholder?: string;
  type?: "text" | "password" | "email" | "number" | "date";
  error?: string;
  prefix?: React.ReactNode;
  value: string;
  className?: string;
  fetchSuggestions: (query: string) => Promise<string[]>;
  minLength?: number;
  debounceTime?: number;
  suggestionsClassName?: string;
  onSelect?: (selectedValue: string) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  renderSuggestion?: (suggestion: string) => JSX.Element;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  id,
  name = "",
  label,
  type = "text",
  className = "",
  value = "",
  inputSize = "",
  prefix,
  fetchSuggestions,
  placeholder = "Search...",
  minLength = 1,
  debounceTime = 300,
  suggestionsClassName = "",
  onSelect,
  error = "",
  onChange,
  renderSuggestion,
  ...rest
}) => {
  const [query, setQuery] = useState<string>("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [noResults, setNoResults] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const suggestionsRef = useRef<HTMLUListElement | null>(null);
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  useOnClickOutside([inputRef, suggestionsRef], handleBlur);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;
    setQuery(userInput);

    if (userInput === "") {
      setFilteredSuggestions([]);
      setLoading(false);
      setNoResults(false);
      return;
    }

    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    if (userInput.length >= minLength) {
      setLoading(true);
      setNoResults(false);

      debounceTimeoutRef.current = setTimeout(async () => {
        try {
          const results = await fetchSuggestions(userInput);
          setLoading(false);

          if (results.length === 0) {
            setNoResults(true);
          } else {
            setFilteredSuggestions(results);
          }
        } catch (error) {
          setLoading(false);
          console.error("Error fetching suggestions:", error);
          setFilteredSuggestions([]);
        }
      }, debounceTime);
    } else {
      setFilteredSuggestions([]);
    }

    if (onChange) {
      onChange(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredSuggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      const selectedSuggestion = filteredSuggestions[activeIndex];
      setQuery(selectedSuggestion);
      setFilteredSuggestions([]);
      if (onSelect) {
        onSelect(selectedSuggestion);
      }
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    if (onSelect) {
      onSelect(suggestion);
    }
    setFilteredSuggestions([]);
  };

  const renderDefaultSuggestion = (suggestion: string) => (
    <li
      key={suggestion}
      className={`p-2 cursor-pointer hover:bg-blue-500 hover:text-white ${
        filteredSuggestions.indexOf(suggestion) === activeIndex
          ? "bg-blue-500 text-white"
          : ""
      }`}
      onClick={() => handleSuggestionClick(suggestion)}
    >
      {suggestion}
    </li>
  );

  return (
    <div className="relative w-full">
      <Input
        ref={inputRef}
        id={id}
        name={name}
        type={type}
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        className={className}
        inputSize={inputSize}
        prefix={prefix}
        {...rest}
      />

      {isFocused && filteredSuggestions.length > 0 && !loading && (
        <ul
          ref={suggestionsRef}
          className={`absolute left-0 right-0 mt-1 bg-white border rounded-md shadow-lg max-h-40 overflow-y-auto z-10 ${suggestionsClassName}`}
        >
          {filteredSuggestions.map((suggestion, index) => {
            return renderSuggestion
              ? renderSuggestion(suggestion)
              : renderDefaultSuggestion(suggestion);
          })}
        </ul>
      )}

      {isFocused && loading && (
        <div className="absolute left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-10 p-2 text-center">
          <span>Loading...</span>
        </div>
      )}

      {isFocused && noResults && !loading && (
        <div className="absolute left-0 right-0 mt-1 bg-white border rounded-md shadow-lg z-10 p-2 text-center">
          <span>No results found</span>
        </div>
      )}

      {error && (
        <div
          id={`${id}-error`}
          className="text-red-600 mt-1 inline-block text-xs font-medium"
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default Autocomplete;
