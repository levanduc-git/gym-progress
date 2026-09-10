import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UserProfile, FitnessGoal, ExperienceLevel, UnitSystem, Gender } from '../../db/schema';
import { Dumbbell, ArrowRight, Check, Sparkles, User, Target, Calendar, ChevronLeft, Scale } from 'lucide-react';

export const OnboardingWizard: React.FC = () => {
  const { completeOnboarding, programs } = useApp();

  const [step, setStep] = useState<number>(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState<UserProfile>({
    id: `user_${Date.now()}`,
    name: 'Gymer',
    gender: 'Nam',
    age: 24,
    heightCm: 175,
    weightKg: 70,
    goal: 'Tăng cơ',
    experience: 'Intermediate',
    trainingDaysPerWeek: 4,
    unit: 'kg',
    soundEnabled: true,
    hapticsEnabled: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const [selectedProgramId, setSelectedProgramId] = useState<string>('prog_ppl_default');

  const goals: FitnessGoal[] = ['Tăng cơ', 'Tăng sức mạnh', 'Giảm mỡ', 'Duy trì'];
  const experiences: ExperienceLevel[] = ['Beginner', 'Intermediate', 'Advanced'];
  const dayOptions = [2, 3, 4, 5, 6];
  const genders: Gender[] = ['Nam', 'Nữ', 'Khác'];

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      completeOnboarding(formData, selectedProgramId);
    }
  };

  const handleSkip = () => {
    completeOnboarding(formData, selectedProgramId);
  };

  return (
    <div className="fixed inset-0 z-50 bg-dark-950 flex flex-col justify-between p-6 max-w-md mx-auto overflow-y-auto">
      {/* Top Header & Progress */}
      <div>
        <div className="flex items-center justify-between pt-2 pb-4">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="p-2 rounded-xl bg-dark-850 border border-white/10 text-gray-400 hover:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-9" />
          )}

          <div className="flex space-x-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i + 1 === step
                    ? 'w-7 bg-primary-500 shadow-[0_0_8px_#10b981]'
                    : i + 1 < step
                    ? 'w-3 bg-primary-500/50'
                    : 'w-3 bg-dark-700'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleSkip}
            className="text-xs font-semibold text-gray-400 hover:text-white px-2 py-1"
          >
            Bỏ qua
          </button>
        </div>

        {/* Step 1: Basic Info & Name */}
        {step === 1 && (
          <div className="space-y-6 pt-4 animate-scale-in">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-primary-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-primary-500/25">
                <Dumbbell className="w-7 h-7 text-dark-950" />
              </div>
              <h2 className="text-2xl font-black text-white">Chào mừng đến với Gym Progress</h2>
              <p className="text-sm text-gray-400">Ứng dụng quản lý giáo án & theo dõi tiến bộ tập gym chuẩn khoa học.</p>
            </div>

            <div className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Tên hoặc biệt danh của bạn
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ví dụ: Alex, Tuấn, ..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-dark-850 border border-white/10 text-white font-medium focus:outline-none focus:border-primary-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Giới tính (Tùy chọn)
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {genders.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, gender: g })}
                      className={`py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                        formData.gender === g
                          ? 'bg-primary-500/20 border-primary-500 text-primary-400'
                          : 'bg-dark-850 border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Body Metrics & Units */}
        {step === 2 && (
          <div className="space-y-6 pt-4 animate-scale-in">
            <div className="space-y-1">
              <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">Thông số thể chất</span>
              <h2 className="text-2xl font-black text-white">Chiều cao & Cân nặng</h2>
              <p className="text-sm text-gray-400">Dùng để ước tính khối lượng tập và biểu đồ tiến bộ.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Đơn vị đo lường
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['kg', 'lb'] as UnitSystem[]).map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => setFormData({ ...formData, unit: u })}
                      className={`py-2.5 rounded-xl border text-sm font-bold uppercase transition-all ${
                        formData.unit === u
                          ? 'bg-primary-500/20 border-primary-500 text-primary-400'
                          : 'bg-dark-850 border-white/10 text-gray-400'
                      }`}
                    >
                      {u === 'kg' ? 'Kilogram (kg)' : 'Pounds (lb)'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Tuổi
                  </label>
                  <input
                    type="number"
                    value={formData.age || ''}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 0 })}
                    placeholder="25"
                    className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-white/10 text-white font-bold focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                    Chiều cao (cm)
                  </label>
                  <input
                    type="number"
                    value={formData.heightCm || ''}
                    onChange={(e) => setFormData({ ...formData, heightCm: parseInt(e.target.value) || 0 })}
                    placeholder="175"
                    className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-white/10 text-white font-bold focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Cân nặng hiện tại ({formData.unit})
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={formData.weightKg || ''}
                  onChange={(e) => setFormData({ ...formData, weightKg: parseFloat(e.target.value) || 0 })}
                  placeholder="70"
                  className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-white/10 text-white font-bold focus:outline-none focus:border-primary-500 text-lg"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Goals & Experience */}
        {step === 3 && (
          <div className="space-y-6 pt-4 animate-scale-in">
            <div className="space-y-1">
              <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">Mục tiêu cá nhân</span>
              <h2 className="text-2xl font-black text-white">Bạn hướng tới điều gì?</h2>
              <p className="text-sm text-gray-400">Tùy biến thuật toán gợi ý mức tạ phù hợp.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Mục tiêu chính
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {goals.map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setFormData({ ...formData, goal: g })}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        formData.goal === g
                          ? 'bg-primary-500/20 border-primary-500 text-primary-400 font-bold shadow-sm'
                          : 'bg-dark-850 border-white/10 text-gray-300 hover:text-white'
                      }`}
                    >
                      <div className="text-sm">{g}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Kinh nghiệm tập luyện
                </label>
                <div className="space-y-2">
                  {experiences.map((exp) => (
                    <button
                      key={exp}
                      type="button"
                      onClick={() => setFormData({ ...formData, experience: exp })}
                      className={`w-full p-3 rounded-xl border flex items-center justify-between transition-all ${
                        formData.experience === exp
                          ? 'bg-primary-500/20 border-primary-500 text-primary-400 font-bold'
                          : 'bg-dark-850 border-white/10 text-gray-300'
                      }`}
                    >
                      <span className="text-sm">{exp}</span>
                      {formData.experience === exp && <Check className="w-4 h-4 text-primary-400" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Số ngày muốn tập mỗi tuần
                </label>
                <div className="flex justify-between gap-2">
                  {dayOptions.map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setFormData({ ...formData, trainingDaysPerWeek: days })}
                      className={`flex-1 py-2.5 rounded-xl border font-bold text-sm transition-all ${
                        formData.trainingDaysPerWeek === days
                          ? 'bg-primary-500 text-dark-950 border-primary-400 font-black'
                          : 'bg-dark-850 border-white/10 text-gray-400'
                      }`}
                    >
                      {days}d
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Program Selection */}
        {step === 4 && (
          <div className="space-y-6 pt-4 animate-scale-in">
            <div className="space-y-1">
              <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">Chọn giáo án đầu tiên</span>
              <h2 className="text-2xl font-black text-white">Chương trình tập luyện</h2>
              <p className="text-sm text-gray-400">Bạn luôn có thể tùy chỉnh hoặc đổi chương trình sau.</p>
            </div>

            <div className="space-y-3">
              {programs.map((prog) => (
                <div
                  key={prog.id}
                  onClick={() => setSelectedProgramId(prog.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedProgramId === prog.id
                      ? 'bg-gradient-to-r from-dark-850 to-primary-950/40 border-primary-500 shadow-md ring-1 ring-primary-500'
                      : 'bg-dark-850 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-white text-base">{prog.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-dark-750 text-primary-400 font-semibold border border-white/5">
                      {prog.daysPerWeek} buổi / tuần
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">{prog.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom CTA Button */}
      <div className="pt-6 pb-2">
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-emerald-400 hover:from-primary-600 hover:to-emerald-500 active:scale-[0.98] text-dark-950 font-black text-base flex items-center justify-center space-x-2 shadow-lg shadow-primary-500/25 transition-all"
        >
          <span>{step === totalSteps ? 'BẮT ĐẦU TẬP LUYỆN' : 'TIẾP TỤC'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
