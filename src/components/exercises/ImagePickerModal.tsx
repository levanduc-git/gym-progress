import React, { useState } from 'react';
import { Exercise, MuscleGroup } from '../../db/schema';
import { PRESET_ILLUSTRATIONS, PresetIllustration } from '../../utils/imageProvider';
import { X, Image as ImageIcon, Upload, Link, Check, Sparkles } from 'lucide-react';

interface ImagePickerModalProps {
  exercise: Exercise;
  onSaveImage: (newImageUrl: string) => void;
  onClose: () => void;
}

export const ImagePickerModal: React.FC<ImagePickerModalProps> = ({
  exercise,
  onSaveImage,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'upload' | 'url'>('presets');
  const [selectedPresetUrl, setSelectedPresetUrl] = useState<string>(
    exercise.images[0]?.url || PRESET_ILLUSTRATIONS[0].url
  );
  const [customUrl, setCustomUrl] = useState<string>('');
  const [uploadedBase64, setUploadedBase64] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Handle local file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      if (base64) {
        setUploadedBase64(base64);
        setSelectedPresetUrl(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    let finalUrl = selectedPresetUrl;
    if (activeTab === 'url' && customUrl.trim()) {
      finalUrl = customUrl.trim();
    } else if (activeTab === 'upload' && uploadedBase64) {
      finalUrl = uploadedBase64;
    }

    if (finalUrl) {
      onSaveImage(finalUrl);
      onClose();
    }
  };

  const categories = ['All', 'Chest', 'Back', 'Shoulders', 'Legs', 'Biceps', 'Triceps', 'Core'];

  const filteredPresets = PRESET_ILLUSTRATIONS.filter((preset) => {
    if (filterCategory === 'All') return true;
    return preset.category === filterCategory;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex flex-col justify-end max-w-md mx-auto animate-scale-in">
      <div className="bg-dark-900 border-t border-white/10 rounded-t-3xl max-h-[85vh] flex flex-col p-4 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="font-black text-white text-base">Đổi hình ảnh minh họa</h3>
            <p className="text-[11px] text-gray-400 truncate max-w-[260px]">
              Bài tập: <span className="text-primary-400 font-bold">{exercise.name}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-dark-800 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-dark-850 rounded-2xl my-3 text-xs font-bold">
          <button
            onClick={() => setActiveTab('presets')}
            className={`py-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'presets'
                ? 'bg-primary-500 text-dark-950 font-black shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Thư viện mẫu</span>
          </button>

          <button
            onClick={() => setActiveTab('upload')}
            className={`py-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'upload'
                ? 'bg-primary-500 text-dark-950 font-black shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Tải ảnh lên</span>
          </button>

          <button
            onClick={() => setActiveTab('url')}
            className={`py-2 rounded-xl flex items-center justify-center space-x-1 transition-all ${
              activeTab === 'url'
                ? 'bg-primary-500 text-dark-950 font-black shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Link className="w-3.5 h-3.5" />
            <span>Link URL / GIF</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto space-y-3 py-1">
          {/* 1. Presets Library */}
          {activeTab === 'presets' && (
            <div className="space-y-3">
              {/* Category Filter Chips */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterCategory(cat)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold shrink-0 transition-all ${
                      filterCategory === cat
                        ? 'bg-primary-500/20 text-primary-400 border border-primary-500/40 font-black'
                        : 'bg-dark-800 text-gray-400 border border-white/5'
                    }`}
                  >
                    {cat === 'All' ? 'Tất cả' : cat}
                  </button>
                ))}
              </div>

              {/* Grid of Presets */}
              <div className="grid grid-cols-2 gap-2.5">
                {filteredPresets.map((preset) => {
                  const isSelected = selectedPresetUrl === preset.url;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => setSelectedPresetUrl(preset.url)}
                      className={`p-2.5 rounded-2xl border transition-all cursor-pointer relative flex flex-col space-y-2 ${
                        isSelected
                          ? 'bg-dark-850 border-primary-500 ring-2 ring-primary-500/50 shadow-md'
                          : 'bg-dark-850/60 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {/* Image Thumbnail */}
                      <div className="w-full h-28 rounded-xl bg-dark-950 border border-white/10 overflow-hidden flex items-center justify-center">
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-contain p-1"
                        />
                      </div>

                      {/* Details */}
                      <div>
                        <span className="text-[9px] font-bold uppercase text-primary-400 block">
                          {preset.category}
                        </span>
                        <h4 className="font-bold text-xs text-white truncate">{preset.name}</h4>
                        <p className="text-[10px] text-gray-400 line-clamp-1">{preset.description}</p>
                      </div>

                      {/* Selection Checkmark */}
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary-500 text-dark-950 flex items-center justify-center shadow">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. File Upload */}
          {activeTab === 'upload' && (
            <div className="space-y-4 py-4 text-center">
              <label className="border-2 border-dashed border-white/15 hover:border-primary-500/60 rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all bg-dark-850/50">
                <Upload className="w-10 h-10 text-primary-400 mb-2 animate-bounce-subtle" />
                <span className="font-bold text-white text-xs">Bấm để chọn ảnh từ thư viện thiết bị</span>
                <span className="text-[10px] text-gray-400 mt-1">Hỗ trợ JPG, PNG, WebP, GIF</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {uploadedBase64 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-300">Xem trước ảnh đã tải:</span>
                  <div className="w-40 h-40 mx-auto rounded-2xl bg-dark-950 border border-primary-500 overflow-hidden p-1">
                    <img
                      src={uploadedBase64}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. Custom Image URL */}
          {activeTab === 'url' && (
            <div className="space-y-3 py-2 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-gray-300 uppercase tracking-wider mb-1.5">
                  Dán đường dẫn ảnh / GIF trực tuyến
                </label>
                <input
                  type="url"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... hoặc https://media.giphy.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-850 border border-white/10 text-white focus:outline-none focus:border-primary-500 text-xs"
                />
              </div>

              {customUrl.trim() && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-gray-300">Xem trước ảnh từ link:</span>
                  <div className="w-40 h-40 mx-auto rounded-2xl bg-dark-950 border border-primary-500 overflow-hidden p-1">
                    <img
                      src={customUrl}
                      alt="Custom URL preview"
                      onError={(e) => {
                        (e.target as HTMLImageElement).alt = 'Lỗi không tải được ảnh từ link này';
                      }}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Save CTA */}
        <div className="pt-3 border-t border-white/10">
          <button
            onClick={handleConfirm}
            className="w-full py-3.5 rounded-2xl bg-primary-500 hover:bg-primary-600 text-dark-950 font-black text-sm flex items-center justify-center space-x-2 shadow-lg shadow-primary-500/20 active:scale-95 transition-all"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>ÁP DỤNG HÌNH ẢNH NÀY</span>
          </button>
        </div>
      </div>
    </div>
  );
};
