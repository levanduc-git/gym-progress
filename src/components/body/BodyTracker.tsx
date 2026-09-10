import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BodyMeasurement, ProgressPhoto } from '../../db/schema';
import { 
  Scale, 
  Camera, 
  Plus, 
  Trash2, 
  TrendingUp, 
  Sparkles, 
  Image as ImageIcon,
  Check,
  Calendar,
  X
} from 'lucide-react';

export const BodyTracker: React.FC = () => {
  const { measurements, addMeasurement, deleteMeasurement, photos, addPhoto, deletePhoto, profile } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'metrics' | 'photos'>('metrics');
  const [isAddMetricOpen, setIsAddMetricOpen] = useState<boolean>(false);
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState<boolean>(false);

  // New Metric Form State
  const [newWeight, setNewWeight] = useState<number>(profile.weightKg || 70);
  const [newBodyFat, setNewBodyFat] = useState<number>(18);
  const [newChest, setNewChest] = useState<number>(98);
  const [newWaist, setNewWaist] = useState<number>(80);
  const [newArm, setNewArm] = useState<number>(35);
  const [newThigh, setNewThigh] = useState<number>(55);
  const [metricDate, setMetricDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // New Photo Form State
  const [photoType, setPhotoType] = useState<'front' | 'side' | 'back'>('front');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [photoNote, setPhotoNote] = useState<string>('');

  const handleSaveMetric = () => {
    addMeasurement({
      date: metricDate,
      weightKg: newWeight,
      bodyFatPercent: newBodyFat || undefined,
      chestCm: newChest || undefined,
      waistCm: newWaist || undefined,
      armCm: newArm || undefined,
      thighCm: newThigh || undefined,
    });
    setIsAddMetricOpen(false);
  };

  const handleSavePhoto = () => {
    if (!photoUrl.trim()) return;
    addPhoto({
      date: new Date().toISOString().split('T')[0],
      type: photoType,
      photoUrl: photoUrl.trim(),
      weightKg: profile.weightKg,
      note: photoNote.trim() || undefined,
    });
    setPhotoUrl('');
    setPhotoNote('');
    setIsAddPhotoOpen(false);
  };

  const latestMeasurement = measurements[0];

  return (
    <div className="p-4 space-y-4 animate-scale-in">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white tracking-tight">Chỉ số & Ảnh cơ thể</h2>
          <p className="text-xs text-gray-400">Theo dõi số đo các vòng và hành trình lột xác</p>
        </div>

        {activeSubTab === 'metrics' ? (
          <button
            onClick={() => setIsAddMetricOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-dark-950 font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-primary-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Ghi số đo</span>
          </button>
        ) : (
          <button
            onClick={() => setIsAddPhotoOpen(true)}
            className="px-3.5 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 text-dark-950 font-bold text-xs flex items-center space-x-1.5 shadow-lg shadow-primary-500/20 active:scale-95 transition-all"
          >
            <Camera className="w-4 h-4" />
            <span>Thêm ảnh</span>
          </button>
        )}
      </div>

      {/* Sub Tabs */}
      <div className="grid grid-cols-2 gap-2 bg-dark-900 p-1.5 rounded-2xl border border-white/5 text-xs font-bold">
        <button
          onClick={() => setActiveSubTab('metrics')}
          className={`py-2 rounded-xl transition-all ${
            activeSubTab === 'metrics'
              ? 'bg-primary-500 text-dark-950 shadow-sm font-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Số đo các vòng (Measurements)
        </button>
        <button
          onClick={() => setActiveSubTab('photos')}
          className={`py-2 rounded-xl transition-all ${
            activeSubTab === 'photos'
              ? 'bg-primary-500 text-dark-950 shadow-sm font-black'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Ảnh tiến độ (Progress Photos)
        </button>
      </div>

      {/* Content: Metrics */}
      {activeSubTab === 'metrics' && (
        <div className="space-y-4">
          {/* Current Numbers Highlight Cards */}
          {latestMeasurement && (
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 bg-dark-900 rounded-2xl border border-white/5 text-center">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Cân nặng</span>
                <span className="text-base font-black text-white">{latestMeasurement.weightKg} {profile.unit}</span>
              </div>
              <div className="p-3 bg-dark-900 rounded-2xl border border-white/5 text-center">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Body Fat</span>
                <span className="text-base font-black text-amber-400">{latestMeasurement.bodyFatPercent || 17}%</span>
              </div>
              <div className="p-3 bg-dark-900 rounded-2xl border border-white/5 text-center">
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Vòng ngực</span>
                <span className="text-base font-black text-primary-400">{latestMeasurement.chestCm || 98} cm</span>
              </div>
            </div>
          )}

          {/* Measurements Timeline */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
              Lịch sử ghi số đo ({measurements.length})
            </h3>

            {measurements.map(m => (
              <div
                key={m.id}
                className="p-3.5 rounded-2xl bg-dark-900 border border-white/5 space-y-2 shadow-sm text-xs"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3.5 h-3.5 text-primary-400" />
                    <span className="font-bold text-white">
                      {new Date(m.date).toLocaleDateString('vi-VN')}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteMeasurement(m.id)}
                    className="p-1 rounded-lg text-gray-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center pt-1">
                  <div>
                    <span className="text-[10px] text-gray-500 block">Cân nặng</span>
                    <strong className="text-gray-200">{m.weightKg} {profile.unit}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">Vòng ngực</span>
                    <strong className="text-gray-200">{m.chestCm || '-'} cm</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">Vòng eo</span>
                    <strong className="text-gray-200">{m.waistCm || '-'} cm</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-500 block">Bắp tay</span>
                    <strong className="text-gray-200">{m.armCm || '-'} cm</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content: Progress Photos */}
      {activeSubTab === 'photos' && (
        <div className="space-y-4">
          {photos.length === 0 ? (
            <div className="text-center py-12 bg-dark-900 rounded-3xl border border-white/5 space-y-3">
              <Camera className="w-10 h-10 mx-auto text-gray-600" />
              <h4 className="text-sm font-bold text-gray-300">Chưa có ảnh tiến độ</h4>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Chụp ảnh vóc dáng theo góc Front, Side, Back để so sánh sự thay đổi theo thời gian.
              </p>
              <button
                onClick={() => setIsAddPhotoOpen(true)}
                className="mt-2 px-4 py-2 rounded-xl bg-primary-500 text-dark-950 font-bold text-xs"
              >
                + Thêm ảnh đầu tiên
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {photos.map(p => (
                <div
                  key={p.id}
                  className="rounded-2xl bg-dark-900 border border-white/5 overflow-hidden relative group shadow-md"
                >
                  <div className="h-44 bg-dark-950 overflow-hidden">
                    <img
                      src={p.photoUrl}
                      alt={p.type}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-2.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-primary-400 uppercase tracking-wider block">
                        {p.type.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(p.date).toLocaleDateString('vi-VN')}
                      </span>
                    </div>
                    <button
                      onClick={() => deletePhoto(p.id)}
                      className="p-1 rounded-lg text-gray-500 hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add Metric Modal */}
      {isAddMetricOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end max-w-md mx-auto animate-scale-in">
          <div className="bg-dark-900 border-t border-white/10 rounded-t-3xl max-h-[85vh] flex flex-col p-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="font-bold text-white text-sm">Ghi số đo cơ thể mới</h3>
              <button
                onClick={() => setIsAddMetricOpen(false)}
                className="p-1.5 rounded-full bg-dark-800 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Cân nặng ({profile.unit})</label>
                <input
                  type="number"
                  step="0.1"
                  value={newWeight}
                  onChange={(e) => setNewWeight(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-xl bg-dark-850 border border-white/10 text-white font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Mỡ cơ thể (Body Fat %)</label>
                <input
                  type="number"
                  step="0.5"
                  value={newBodyFat}
                  onChange={(e) => setNewBodyFat(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-xl bg-dark-850 border border-white/10 text-white font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Vòng ngực (cm)</label>
                <input
                  type="number"
                  value={newChest}
                  onChange={(e) => setNewChest(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-xl bg-dark-850 border border-white/10 text-white font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Vòng eo (cm)</label>
                <input
                  type="number"
                  value={newWaist}
                  onChange={(e) => setNewWaist(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-xl bg-dark-850 border border-white/10 text-white font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Bắp tay (cm)</label>
                <input
                  type="number"
                  value={newArm}
                  onChange={(e) => setNewArm(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-xl bg-dark-850 border border-white/10 text-white font-bold text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Vòng đùi (cm)</label>
                <input
                  type="number"
                  value={newThigh}
                  onChange={(e) => setNewThigh(parseFloat(e.target.value) || 0)}
                  className="w-full p-2.5 rounded-xl bg-dark-850 border border-white/10 text-white font-bold text-sm"
                />
              </div>
            </div>

            <button
              onClick={handleSaveMetric}
              className="w-full py-3.5 rounded-2xl bg-primary-500 hover:bg-primary-600 text-dark-950 font-black text-xs"
            >
              LƯU SỐ ĐO
            </button>
          </div>
        </div>
      )}

      {/* Add Photo Modal */}
      {isAddPhotoOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end max-w-md mx-auto animate-scale-in">
          <div className="bg-dark-900 border-t border-white/10 rounded-t-3xl max-h-[85vh] flex flex-col p-4 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="font-bold text-white text-sm">Thêm ảnh tiến độ</h3>
              <button
                onClick={() => setIsAddPhotoOpen(false)}
                className="p-1.5 rounded-full bg-dark-800 text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Góc chụp</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['front', 'side', 'back'] as const).map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setPhotoType(t)}
                      className={`py-2 rounded-xl border text-xs font-bold uppercase ${
                        photoType === t
                          ? 'bg-primary-500 text-dark-950 font-black'
                          : 'bg-dark-850 text-gray-400 border-white/5'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Đường dẫn ảnh (URL)</label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full p-2.5 rounded-xl bg-dark-850 border border-white/10 text-white font-medium text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] text-gray-400 mb-1">Ghi chú (Tùy chọn)</label>
                <input
                  type="text"
                  value={photoNote}
                  onChange={(e) => setPhotoNote(e.target.value)}
                  placeholder="VD: Sau 4 tuần bulking..."
                  className="w-full p-2.5 rounded-xl bg-dark-850 border border-white/10 text-white text-xs"
                />
              </div>
            </div>

            <button
              onClick={handleSavePhoto}
              disabled={!photoUrl.trim()}
              className="w-full py-3.5 rounded-2xl bg-primary-500 hover:bg-primary-600 disabled:opacity-30 text-dark-950 font-black text-xs"
            >
              LƯU ẢNH TIẾN ĐỘ
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
