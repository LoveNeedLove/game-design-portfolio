"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Task, ContentBlock } from "../data";

interface RoleDetailModalProps {
  tasks: Task[];
  initialTaskIndex: number;
  onClose: () => void;
  accentColor?: string;
}

export default function RoleDetailModal({ tasks, initialTaskIndex, onClose, accentColor = "#3b82f6" }: RoleDetailModalProps) {
  const [activeTaskIndex, setActiveTaskIndex] = useState(initialTaskIndex);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [expandedSlideshows, setExpandedSlideshows] = useState<Set<number>>(new Set());
  const [slideshowIndices, setSlideshowIndices] = useState<Record<number, number>>({});
  const [pdfPages, setPdfPages] = useState<Record<number, string[]>>({});
  const scrollRef = useRef<HTMLDivElement>(null);

  const activeTask = tasks[activeTaskIndex];
  const contentBlocks = activeTask?.content || [];

  // Render PDF pages for slideshow blocks with PDF URLs (dynamic import to avoid SSR crash)
  useEffect(() => {
    const pdfBlocks = contentBlocks
      .map((block, index) => ({ block, index }))
      .filter(({ block, index }) => block.type === 'slideshow' && block.url?.toLowerCase().endsWith('.pdf') && !pdfPages[index]);

    if (pdfBlocks.length === 0) return;

    (async () => {
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.mjs`;

      for (const { block, index } of pdfBlocks) {
        try {
          const pdf = await pdfjs.getDocument(block.url!).promise;
          const pages: string[] = [];
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement('canvas');
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext('2d')!;
            await page.render({ canvasContext: ctx, viewport, canvas } as Parameters<typeof page.render>[0]).promise;
            pages.push(canvas.toDataURL('image/png'));
          }
          setPdfPages(prev => ({ ...prev, [index]: pages }));
        } catch (err) {
          console.error('Failed to render PDF:', err);
        }
      }
    })();
  }, [contentBlocks, pdfPages]);

  // Reset PDF pages when switching tasks
  useEffect(() => {
    setPdfPages({});
  }, [activeTaskIndex]);

  // Helper: get resolved images for a slideshow block (PDF pages or regular images)
  const getSlideshowImages = (block: ContentBlock, index: number): string[] => {
    if (block.url?.toLowerCase().endsWith('.pdf')) {
      return pdfPages[index] || [];
    }
    return block.images || [];
  };

  // Dedicated slideshow viewer state (separate from fullscreen image viewer)
  const [openSlideshowIndex, setOpenSlideshowIndex] = useState<number | null>(null);
  const [slideshowViewerPage, setSlideshowViewerPage] = useState(0);

  // Get all images from content for navigation in fullscreen (excludes slideshows)
  const contentImages = contentBlocks.flatMap((b) => {
    if (b.type === 'image') return [b.url!];
    return [];
  });
  const illustrationImages = activeTask?.illustrations?.map(img => img.url) || [];
  const allImages = contentImages.length > 0 ? contentImages : illustrationImages;
  const currentImageIndex = selectedImageUrl ? allImages.indexOf(selectedImageUrl) : -1;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (openSlideshowIndex !== null) {
          setOpenSlideshowIndex(null);
        } else if (selectedImageUrl) {
          setSelectedImageUrl(null);
        } else {
          onClose();
        }
      }
      // Slideshow viewer navigation
      if (openSlideshowIndex !== null) {
        const ssBlock = contentBlocks[openSlideshowIndex];
        const ssImages = getSlideshowImages(ssBlock, openSlideshowIndex);
        if (ssImages.length > 1) {
          if (e.key === 'ArrowLeft') {
            setSlideshowViewerPage(prev => (prev - 1 + ssImages.length) % ssImages.length);
          }
          if (e.key === 'ArrowRight') {
            setSlideshowViewerPage(prev => (prev + 1) % ssImages.length);
          }
        }
        return;
      }
      // Fullscreen image navigation
      if (selectedImageUrl && allImages.length > 1) {
        if (e.key === 'ArrowLeft') {
          const newIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
          setSelectedImageUrl(allImages[newIndex]);
        }
        if (e.key === 'ArrowRight') {
          const newIndex = (currentImageIndex + 1) % allImages.length;
          setSelectedImageUrl(allImages[newIndex]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, selectedImageUrl, allImages, currentImageIndex, openSlideshowIndex, contentBlocks, pdfPages]);

  // Global mouseup handler
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    if (isDragging) {
      window.addEventListener('mouseup', handleGlobalMouseUp);
      return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
    }
  }, [isDragging]);

  // Reset zoom when changing images
  useEffect(() => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  }, [selectedImageUrl]);

  // Reset scroll when changing task
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activeTaskIndex]);

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) setPanPosition({ x: 0, y: 0 });
      return newZoom;
    });
  };
  const handleZoomReset = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    if (selectedImageUrl) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.2 : 0.2;
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      setZoomLevel(prev => {
        const newZoom = Math.max(1, Math.min(3, prev + delta));
        if (newZoom === 1) {
          setPanPosition({ x: 0, y: 0 });
        } else if (prev !== newZoom) {
          const imageX = (mouseX - panPosition.x) / prev;
          const imageY = (mouseY - panPosition.y) / prev;
          setPanPosition({
            x: mouseX - imageX * newZoom,
            y: mouseY - imageY * newZoom
          });
        }
        return newZoom;
      });
    }
  };

  const handlePrevImage = () => {
    if (allImages.length > 1) {
      const newIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
      setSelectedImageUrl(allImages[newIndex]);
    }
  };

  const handleNextImage = () => {
    if (allImages.length > 1) {
      const newIndex = (currentImageIndex + 1) % allImages.length;
      setSelectedImageUrl(allImages[newIndex]);
    }
  };

  // Parse text with custom markup tags
  const parseMarkup = (text: string): React.ReactNode => {
    // Regex to match custom tags: [tag=value]content[/tag]
    const tagRegex = /\[(\w+)(?:=([^\]]+))?\](.*?)\[\/\1\]/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = tagRegex.exec(text)) !== null) {
      // Add text before the tag
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }

      const tag = match[1];
      const value = match[2];
      const content = match[3];

      // Recursively parse nested tags
      const parsedContent = parseMarkup(content);

      // Apply styling based on tag
      switch (tag.toLowerCase()) {
        case 'b':
        case 'bold':
          parts.push(<strong key={match.index}>{parsedContent}</strong>);
          break;
        case 'i':
        case 'italic':
          parts.push(<em key={match.index}>{parsedContent}</em>);
          break;
        case 'color':
          parts.push(<span key={match.index} style={{ color: value }}>{parsedContent}</span>);
          break;
        case 'size':
          parts.push(<span key={match.index} style={{ fontSize: value }}>{parsedContent}</span>);
          break;
        case 'font':
          parts.push(<span key={match.index} style={{ fontFamily: value }}>{parsedContent}</span>);
          break;
        case 'u':
        case 'underline':
          parts.push(<span key={match.index} style={{ textDecoration: 'underline' }}>{parsedContent}</span>);
          break;
        default:
          parts.push(content);
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  // Image sizing helpers
  const sizeToMaxWidth: Record<string, string> = {
    full: '100%',
    large: '85%',
    medium: '65%',
    small: '45%'
  };

  const formatToAspectRatio = (format?: string) => {
    switch (format) {
      case '16/9': return '16 / 9';
      case '1/1': return '1 / 1';
      default: return undefined; // auto = native ratio
    }
  };

  const getImageContainerStyle = (block: ContentBlock) => {
    const style: React.CSSProperties = {};
    const size = block.size || 'full';
    style.maxWidth = sizeToMaxWidth[size] || '100%';
    const ar = formatToAspectRatio(block.format);
    if (ar) style.aspectRatio = ar;
    return style;
  };

  const getImageClass = (format?: string) => {
    // With a forced aspect ratio, use object-cover to fill the box
    // With auto/no format, let the image keep its native ratio
    return format && format !== 'auto'
      ? 'w-full h-full object-cover'
      : 'w-full h-auto object-cover';
  };

  // Render a content block
  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case 'heading':
        return (
          <motion.div
            key={`heading-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="py-6"
          >
            <h3
              className="font-black text-white/90 leading-tight"
              style={{ fontSize: 'clamp(24px, 4vmin, 42px)' }}
            >
              {parseMarkup(block.content || '')}
            </h3>
          </motion.div>
        );

      case 'separator':
        return (
          <motion.div
            key={`separator-${index}`}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
            className="py-8"
          >
            <div className="h-px bg-white/20 origin-left" />
          </motion.div>
        );

      case 'text':
        // Variant styles for magazine feel
        const variantStyles = {
          accent: 'text-white/90 font-semibold border-l-4 border-white/40 pl-6',
          quote: 'text-white/80 italic border-l-4 border-white/20 pl-6 text-lg',
          highlight: 'bg-white/5 rounded-xl p-6 text-white/80',
          default: 'text-white/70'
        };
        const textVariant = block.variant || 'default';

        return (
          <motion.div
            key={`text-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="py-4"
          >
            <p
              className={`leading-relaxed ${variantStyles[textVariant]}`}
              style={{ fontSize: textVariant === 'quote' ? 'clamp(16px, 2.5vmin, 22px)' : 'clamp(14px, 2vmin, 18px)' }}
            >
              {parseMarkup(block.content || '')}
            </p>
          </motion.div>
        );

      case 'list':
        return (
          <motion.div
            key={`list-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="py-4"
          >
            {block.content && (
              <h4
                className="font-bold text-white/90 mb-4"
                style={{ fontSize: 'clamp(16px, 2.2vmin, 22px)' }}
              >
                {parseMarkup(block.content)}
              </h4>
            )}
            <ul className="space-y-3">
              {block.items?.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-white/70"
                  style={{ fontSize: 'clamp(13px, 1.8vmin, 16px)' }}
                >
                  <span className="text-white/40 mt-1.5 text-lg">•</span>
                  <span className="leading-relaxed">{parseMarkup(item)}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        );

      case 'image':
        const imgContainerStyle = getImageContainerStyle(block);
        const imgClass = getImageClass(block.format);
        const imgAlignClass = block.align === 'right' ? 'ml-auto' : block.align === 'left' ? 'mr-auto' : 'mx-auto';

        return (
          <motion.div
            key={`image-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="py-4"
          >
            <div
              className={`relative rounded-xl overflow-hidden bg-zinc-800 cursor-pointer group ${imgAlignClass}`}
              style={imgContainerStyle}
              onClick={() => setSelectedImageUrl(block.url!)}
            >
              <img
                src={block.url}
                alt=""
                className={`${imgClass} transition-transform duration-500 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-md rounded-full p-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                  </svg>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'slideshow':
        if (!block.images || block.images.length === 0) return null;
        const isExpanded = expandedSlideshows.has(index);
        const currentIndex = slideshowIndices[index] || 0;
        const currentImage = block.images[currentIndex];

        return (
          <motion.div
            key={`slideshow-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="py-4"
          >
            {/* Slideshow header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-white/70">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3 5c0-1.1.9-2 2-2h4l2 2h8c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5z"/>
                </svg>
                <span className="font-medium">{block.title || 'Slideshow'}</span>
                <span className="text-white/40">({block.images.length} images)</span>
              </div>
              <button
                onClick={() => {
                  setExpandedSlideshows(prev => {
                    const next = new Set(prev);
                    if (next.has(index)) {
                      next.delete(index);
                    } else {
                      next.add(index);
                    }
                    return next;
                  });
                }}
                className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white/70 text-sm transition-all"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                >
                  <path d="M9 6l6 6-6 6"/>
                </svg>
                {isExpanded ? 'Collapse' : 'Expand'}
              </button>
            </div>

            {/* Main image display */}
            <div
              className="relative rounded-xl overflow-hidden bg-zinc-800 cursor-pointer group"
              style={{ aspectRatio: formatToAspectRatio(block.format) }}
              onClick={() => {
                setOpenSlideshowIndex(index);
                setSlideshowViewerPage(currentIndex);
              }}
            >
              <img
                src={currentImage}
                alt=""
                className={getImageClass(block.format)}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-md rounded-full p-4">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                    <path d="M3 5c0-1.1.9-2 2-2h4l2 2h8c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5z"/>
                  </svg>
                </div>
              </div>

              {/* Navigation arrows */}
              {block.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSlideshowIndices(prev => ({
                        ...prev,
                        [index]: (currentIndex - 1 + block.images!.length) % block.images!.length
                      }));
                    }}
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSlideshowIndices(prev => ({
                        ...prev,
                        [index]: (currentIndex + 1) % block.images!.length
                      }));
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-all opacity-0 group-hover:opacity-100"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-5 h-5">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded text-white/80 text-xs">
                {currentIndex + 1} / {block.images.length}
              </div>
            </div>

            {/* Expanded thumbnails */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
                    {block.images.map((img, imgIdx) => (
                      <div
                        key={imgIdx}
                        onClick={() => setSlideshowIndices(prev => ({ ...prev, [index]: imgIdx }))}
                        className={`flex-shrink-0 w-20 aspect-video rounded overflow-hidden cursor-pointer border-2 transition-all ${
                          imgIdx === currentIndex ? 'border-white scale-105' : 'border-transparent opacity-50 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case 'video': {
        const vidContainerStyle = getImageContainerStyle(block);
        const vidAlignClass = block.align === 'right' ? 'ml-auto' : block.align === 'left' ? 'mr-auto' : 'mx-auto';

        return (
          <motion.div
            key={`video-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="py-4"
          >
            <div
              className={`relative rounded-xl overflow-hidden bg-zinc-900 ${vidAlignClass}`}
              style={vidContainerStyle}
            >
              <video
                src={block.url}
                controls
                playsInline
                className="w-full h-full"
                style={formatToAspectRatio(block.format) ? { aspectRatio: formatToAspectRatio(block.format) } : undefined}
              />
            </div>
          </motion.div>
        );
      }

      case 'youtube': {
        // Extract video ID from various YouTube URL formats
        const getYoutubeId = (url: string) => {
          const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?\s]+)/);
          return match ? match[1] : url;
        };
        const videoId = getYoutubeId(block.url || block.content || '');
        const ytContainerStyle = getImageContainerStyle(block);
        const ytAlignClass = block.align === 'right' ? 'ml-auto' : block.align === 'left' ? 'mr-auto' : 'mx-auto';

        return (
          <motion.div
            key={`youtube-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="py-4"
          >
            <div
              className={`relative rounded-xl overflow-hidden bg-zinc-900 ${ytAlignClass}`}
              style={{ ...ytContainerStyle, aspectRatio: ytContainerStyle.aspectRatio || '16 / 9' }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>
        );
      }

      default:
        return null;
    }
  };

  const hasPrevRole = tasks.length > 1 && activeTaskIndex > 0;
  const hasNextRole = tasks.length > 1 && activeTaskIndex < tasks.length - 1;

  return (
    <div className="fixed inset-0 z-[300]">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
      />

      {/* Close button - fixed position */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed top-4 right-4 z-[350] p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white font-black backdrop-blur-sm"
        style={{ fontSize: 'clamp(12px, 1.8vmin, 18px)' }}
      >
        [X]
      </motion.button>

      {/* Full screen scrollable container */}
      <motion.div
        ref={scrollRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full overflow-y-auto overflow-x-hidden"
      >
        <div
          className="max-w-4xl mx-auto"
          style={{
            padding: 'clamp(24px, 6vmin, 80px)',
            paddingBottom: 'clamp(48px, 8vmin, 100px)'
          }}
        >
          {/* Title and description - now part of scrollable content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12"
          >
            <h2
              className="font-black text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(32px, 7vmin, 72px)' }}
            >
              {activeTask.title}
            </h2>
            <p
              className="text-white/70 leading-relaxed"
              style={{ fontSize: 'clamp(16px, 2.5vmin, 24px)' }}
            >
              {activeTask.description}
            </p>
          </motion.div>

          {/* Separator line */}
          {contentBlocks.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="mb-12 h-px bg-white/20 origin-left"
            />
          )}

          {/* Content layout with custom groups */}
          <div className="space-y-8">
            {(() => {
              // Build rows: group blocks by their group ID, or render individually
              const rows: { groupId: string | null; blocks: { block: ContentBlock; index: number }[] }[] = [];
              const processedIndices = new Set<number>();

              contentBlocks.forEach((block, index) => {
                if (processedIndices.has(index)) return;

                if (block.group) {
                  // Find all blocks with the same group ID
                  const groupBlocks = contentBlocks
                    .map((b, i) => ({ block: b, index: i }))
                    .filter(item => item.block.group === block.group && !processedIndices.has(item.index));

                  groupBlocks.forEach(item => processedIndices.add(item.index));
                  rows.push({ groupId: block.group, blocks: groupBlocks });
                } else {
                  processedIndices.add(index);
                  rows.push({ groupId: null, blocks: [{ block, index }] });
                }
              });

              // Render helper for grouped blocks
              const renderGroupedBlock = (block: ContentBlock, index: number) => {
                const textAlignClass = block.textAlign === 'center' ? 'text-center' : block.textAlign === 'right' ? 'text-right' : 'text-left';

                if (block.type === 'text') {
                  return (
                    <p
                      className={`text-white/70 leading-relaxed ${textAlignClass}`}
                      style={{ fontSize: 'clamp(14px, 2vmin, 18px)' }}
                    >
                      {parseMarkup(block.content || '')}
                    </p>
                  );
                } else if (block.type === 'image') {
                  const groupedAr = formatToAspectRatio(block.format);
                  return (
                    <div
                      className="relative rounded-xl overflow-hidden bg-zinc-800 cursor-pointer group h-full"
                      style={groupedAr ? { aspectRatio: groupedAr } : undefined}
                      onClick={() => setSelectedImageUrl(block.url!)}
                    >
                      <img
                        src={block.url}
                        alt=""
                        className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105`}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/20 backdrop-blur-md rounded-full p-4">
                          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
                            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  );
                } else if (block.type === 'video') {
                  return (
                    <div className="relative rounded-xl overflow-hidden bg-zinc-900 h-full">
                      <video
                        src={block.url}
                        controls
                        playsInline
                        className="w-full h-full"
                      />
                    </div>
                  );
                }
                return null;
              };

              return rows.map((row, rowIndex) => {
                if (row.groupId && row.blocks.length > 1) {
                  // Grouped blocks - organize by groupStack first
                  const stackMap: Map<string, { block: ContentBlock; index: number }[]> = new Map();

                  row.blocks.forEach(item => {
                    const stackId = item.block.groupStack || `_default_${item.index}`;
                    if (!stackMap.has(stackId)) {
                      stackMap.set(stackId, []);
                    }
                    stackMap.get(stackId)!.push(item);
                  });

                  // Render as columns (stacks) within a row
                  return (
                    <motion.div
                      key={`row-${rowIndex}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + rowIndex * 0.05 }}
                      className="flex flex-col md:flex-row gap-6 items-stretch"
                    >
                      {Array.from(stackMap.values()).map((stackBlocks, stackIndex) => (
                        <div key={stackIndex} className="flex-1 flex flex-col gap-4 justify-center">
                          {stackBlocks.map(({ block, index }) => (
                            <div key={index}>
                              {renderGroupedBlock(block, index)}
                            </div>
                          ))}
                        </div>
                      ))}
                    </motion.div>
                  );
                } else {
                  // Single block - render normally
                  const { block, index } = row.blocks[0];
                  return (
                    <div key={`row-${rowIndex}`}>
                      {renderContentBlock(block, index)}
                    </div>
                  );
                }
              });
            })()}
          </div>

          {/* Fallback: show illustrations if no content blocks */}
          {contentBlocks.length === 0 && activeTask.illustrations && activeTask.illustrations.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeTask.illustrations.map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="relative rounded-xl overflow-hidden bg-zinc-800 cursor-pointer group"
                  onClick={() => setSelectedImageUrl(img.url)}
                >
                  <img
                    src={img.url}
                    alt=""
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                </motion.div>
              ))}
            </div>
          )}

          {/* Fallback: show message if no content and no illustrations */}
          {contentBlocks.length === 0 && (!activeTask.illustrations || activeTask.illustrations.length === 0) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <p
                className="text-white/40 italic"
                style={{ fontSize: 'clamp(14px, 2vmin, 18px)' }}
              >
                Detailed content coming soon...
              </p>
            </motion.div>
          )}

          {/* Footer with role buttons */}
          {tasks.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-24 pt-12 border-t border-white/10"
            >
              <div className="flex flex-wrap justify-center gap-3">
                {tasks.map((task, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTaskIndex(index)}
                    className={`px-4 py-2 rounded-full font-medium transition-all ${
                      index === activeTaskIndex
                        ? 'bg-white text-black'
                        : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                    }`}
                    style={{ fontSize: 'clamp(11px, 1.4vmin, 14px)' }}
                  >
                    {task.title}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>

      {/* Fixed navigation buttons - always visible */}
      {hasPrevRole && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setActiveTaskIndex(activeTaskIndex - 1)}
          className="fixed left-6 top-1/2 -translate-y-1/2 z-[320] p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </motion.button>
      )}

      {hasNextRole && (
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setActiveTaskIndex(activeTaskIndex + 1)}
          className="fixed right-6 top-1/2 -translate-y-1/2 z-[320] p-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </motion.button>
      )}

      {/* Fullscreen image viewer with zoom controls */}
      <AnimatePresence>
        {selectedImageUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[400] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImageUrl(null)}
          >
            {/* Close button */}
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedImageUrl(null); }}
              className="absolute top-4 right-4 z-50 p-3 bg-white rounded-full shadow-lg hover:bg-zinc-100 transition-all"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            {/* Zoom controls */}
            <div className="absolute top-4 left-4 z-50 flex gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-3 bg-white rounded-full shadow-lg hover:bg-zinc-100 transition-all disabled:opacity-30"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35M8 11h6"/>
                </svg>
              </button>
              <button
                onClick={handleZoomReset}
                className="px-4 py-3 bg-white rounded-full shadow-lg text-sm font-bold hover:bg-zinc-100 transition-all cursor-pointer"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                onClick={handleZoomIn}
                disabled={zoomLevel >= 3}
                className="p-3 bg-white rounded-full shadow-lg hover:bg-zinc-100 transition-all disabled:opacity-30"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8"/>
                  <path d="M21 21l-4.35-4.35M11 8v6M8 11h6"/>
                </svg>
              </button>
            </div>

            {/* Image container with zoom and pan */}
            <div
              className="relative w-full h-full flex items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Zoom/pan wrapper */}
              <div
                className={`w-full h-full flex items-center justify-center select-none ${zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'}`}
                style={{
                  transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                  transition: isDragging ? 'none' : 'transform 0.2s ease-out'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onWheel={handleWheel}
              >
                {/* Animation wrapper */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={selectedImageUrl}
                    src={selectedImageUrl || ''}
                    alt="Full size"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="max-w-full max-h-[90vh] object-contain"
                    draggable={false}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </AnimatePresence>
              </div>
            </div>

            {/* Navigation arrows - always visible when multiple images */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-40 p-4 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M15 18l-6-6 6-6"/>
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-40 p-4 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </button>

                {/* Thumbnails bar - hidden by default, appears on hover */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-40"
                  onMouseEnter={() => setShowThumbnails(true)}
                  onMouseLeave={() => setShowThumbnails(false)}
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Hover detection zone */}
                  <div className="h-24" />

                  {/* Thumbnails container */}
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{
                      y: showThumbnails ? 0 : 100,
                      opacity: showThumbnails ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="pb-6 px-4"
                  >
                    <div className="max-w-4xl mx-auto bg-black/80 backdrop-blur-sm rounded-lg p-3">
                      <div className="flex gap-3 overflow-x-auto overflow-y-hidden justify-center" style={{ scrollbarWidth: 'thin' }}>
                        {allImages.map((url, index) => (
                          <div
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedImageUrl(url);
                            }}
                            className={`flex-shrink-0 w-20 aspect-video bg-zinc-800 rounded-sm overflow-hidden border-2 cursor-pointer transition-all ${
                              selectedImageUrl === url
                                ? 'border-white scale-105'
                                : 'border-transparent opacity-50 hover:opacity-100'
                            }`}
                          >
                            <img
                              src={url}
                              className="w-full h-full object-cover"
                              alt={`Thumb ${index}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Image counter */}
                    <p className="text-center text-white/50 text-sm mt-2">
                      {currentImageIndex + 1} / {allImages.length}
                    </p>
                  </motion.div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dedicated slideshow viewer */}
      <AnimatePresence>
        {openSlideshowIndex !== null && (() => {
          const ssBlock = contentBlocks[openSlideshowIndex];
          const ssImages = getSlideshowImages(ssBlock, openSlideshowIndex);
          if (!ssImages.length) return null;
          const ssPage = slideshowViewerPage;
          const ssTotal = ssImages.length;

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[400] bg-black/95 flex flex-col"
              onClick={() => setOpenSlideshowIndex(null)}
            >
              {/* Top bar */}
              <div className="flex items-center justify-between px-6 py-4 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-3 text-white/80">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M3 5c0-1.1.9-2 2-2h4l2 2h8c1.1 0 2 .9 2 2v10c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V5z"/>
                  </svg>
                  <span className="font-medium">{ssBlock.title || 'Slideshow'}</span>
                  <span className="text-white/40 text-sm">{ssPage + 1} / {ssTotal}</span>
                </div>
                <button
                  onClick={() => setOpenSlideshowIndex(null)}
                  className="p-3 bg-white rounded-full shadow-lg hover:bg-zinc-100 transition-all"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              {/* Main image area */}
              <div className="flex-1 flex items-center justify-center relative px-16 min-h-0" onClick={(e) => e.stopPropagation()}>
                {/* Navigation arrows */}
                {ssTotal > 1 && (
                  <>
                    <button
                      onClick={() => setSlideshowViewerPage((ssPage - 1 + ssTotal) % ssTotal)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M15 18l-6-6 6-6"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => setSlideshowViewerPage((ssPage + 1) % ssTotal)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-4 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </button>
                  </>
                )}

                {/* Image with animation */}
                <AnimatePresence mode="wait" initial={false}>
                  <motion.img
                    key={ssPage}
                    src={ssImages[ssPage]}
                    alt={`Slide ${ssPage + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="max-w-full max-h-full object-contain rounded-lg"
                    draggable={false}
                  />
                </AnimatePresence>
              </div>

              {/* Thumbnail strip */}
              <div className="flex-shrink-0 px-4 pb-4 pt-2" onClick={(e) => e.stopPropagation()}>
                <div className="max-w-4xl mx-auto bg-black/60 backdrop-blur-sm rounded-lg p-3">
                  <div className="flex gap-2 overflow-x-auto justify-center" style={{ scrollbarWidth: 'thin' }}>
                    {ssImages.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => setSlideshowViewerPage(i)}
                        className={`flex-shrink-0 w-16 aspect-video bg-zinc-800 rounded-sm overflow-hidden border-2 cursor-pointer transition-all ${
                          i === ssPage
                            ? 'border-white scale-105'
                            : 'border-transparent opacity-40 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
