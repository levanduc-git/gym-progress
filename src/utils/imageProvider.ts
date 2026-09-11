// ==========================================
// GYMVISUAL 3D ANIMATED GIF EXERCISE IMAGE SYSTEM
// ==========================================

import { ExerciseImage, MuscleGroup } from '../db/schema';

export interface PresetIllustration {
  id: string;
  name: string;
  category: MuscleGroup;
  url: string;
  thumbnailUrl: string;
  description: string;
}

// 3D GymVisual Animated GIFs mapped specifically to exercises
export const GYMVISUAL_ANIMATED_GIFS: Record<string, string> = {
  // ================= CHEST =================
  'Barbell Bench Press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif',
  'Incline Bench Press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Barbell-Bench-Press.gif',
  'Dumbbell Bench Press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif',
  'Incline Dumbbell Press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif',
  'Cable Fly': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crossover.gif',
  'Pec Deck': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pec-Deck-Fly.gif',
  'Chest Dips': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Chest-Dips.gif',
  'Push Up': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif',

  // ================= BACK =================
  'Pull Up': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif',
  'Lat Pulldown': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif',
  'Barbell Row': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Bent-Over-Row.gif',
  'Seated Cable Row': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif',
  'Deadlift': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Deadlift.gif',
  'Chest Supported Row': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Row.gif',
  'Single Arm Dumbbell Row': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Row.gif',
  'T-Bar Row': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/T-Bar-Row.gif',

  // ================= SHOULDERS =================
  'Overhead Press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Shoulder-Press.gif',
  'Dumbbell Shoulder Press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif',
  'Lateral Raise': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif',
  'Rear Delt Fly': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Rear-Delt-Fly.gif',
  'Face Pull': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif',
  'Arnold Press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Arnold-Press.gif',

  // ================= LEGS =================
  'Back Squat': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif',
  'Front Squat': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Front-Squat.gif',
  'Leg Press': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Press.gif',
  'Romanian Deadlift': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Romanian-Deadlift.gif',
  'Leg Curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lying-Leg-Curl.gif',
  'Leg Extension': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif',
  'Bulgarian Split Squat': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Bulgarian-Split-Squat.gif',
  'Standing Calf Raise': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Standing-Calf-Raise.gif',

  // ================= ARMS (BICEPS & TRICEPS) =================
  'Barbell Curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif',
  'Dumbbell Curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif',
  'Hammer Curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif',
  'Cable Curl': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Curl.gif',
  'Triceps Pushdown': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Tricep-Pushdown.gif',
  'Skull Crusher': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lying-Triceps-Extension.gif',
  'Overhead Triceps Extension': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Overhead-Triceps-Extension.gif',

  // ================= CORE =================
  'Hanging Leg Raise': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Hanging-Leg-Raise.gif',
  'Plank': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Plank.gif',
  'Ab Wheel Rollout': 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Ab-Wheel-Rollout.gif',
};

// Anatomical SVG fallback when offline
export function getMuscleSvgFallback(primaryMuscle: MuscleGroup): string {
  const colorMap: Record<MuscleGroup, string> = {
    Chest: '#EF4444',
    Back: '#3B82F6',
    Shoulders: '#F59E0B',
    Legs: '#10B981',
    Biceps: '#8B5CF6',
    Triceps: '#EC4899',
    Core: '#06B6D4',
    Forearms: '#14B8A6',
    Calves: '#84CC16',
    'Full Body': '#6366F1',
    Cardio: '#F97316',
  };

  const color = colorMap[primaryMuscle] || '#10B981';

  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="16" fill="%23131822"/>
    <rect x="2" y="2" width="96" height="96" rx="14" stroke="%23222A3A" stroke-width="2"/>
    <circle cx="50" cy="25" r="9" stroke="%23374151" stroke-width="2.5" fill="%231F2937"/>
    <path d="M35 40 C35 37, 65 37, 65 40 L68 65 C68 67, 62 69, 50 69 C38 69, 32 67, 32 65 Z" fill="%231F2937" stroke="%23374151" stroke-width="2"/>
    <circle cx="50" cy="50" r="14" fill="${encodeURIComponent(color)}" fill-opacity="0.35"/>
    <rect x="15" y="80" width="70" height="12" rx="4" fill="%230D1117" stroke="%23222A3A" stroke-width="1"/>
    <text x="50" y="89" text-anchor="middle" fill="${encodeURIComponent(color)}" font-family="system-ui, sans-serif" font-weight="800" font-size="7.5">${encodeURIComponent(primaryMuscle.toUpperCase())}</text>
  </svg>`;
}

// Global Preset Gallery with 3D Animated GIFs
export const PRESET_ILLUSTRATIONS: PresetIllustration[] = [
  // CHEST
  {
    id: 'gif_bench_press',
    name: 'Barbell Bench Press (Đẩy ngực đòn)',
    category: 'Chest',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Bench-Press.gif',
    description: '3D GymVisual animation - Cơ ngực lớn (Pectoralis Major)'
  },
  {
    id: 'gif_incline_press',
    name: 'Incline Bench Press (Đẩy ngực dốc)',
    category: 'Chest',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Barbell-Bench-Press.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Barbell-Bench-Press.gif',
    description: '3D GymVisual animation - Cơ ngực trên (Clavicular Head)'
  },
  {
    id: 'gif_db_press',
    name: 'Dumbbell Bench Press (Đẩy ngực tạ đơn)',
    category: 'Chest',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Press.gif',
    description: '3D GymVisual animation - Đẩy tạ đơn tăng biên độ'
  },
  {
    id: 'gif_incline_db_press',
    name: 'Incline Dumbbell Press (Tạ đơn ghế dốc)',
    category: 'Chest',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Incline-Dumbbell-Press.gif',
    description: '3D GymVisual animation - Ép ngực trên toàn diện'
  },
  {
    id: 'gif_cable_fly',
    name: 'Cable Fly / Crossover (Ép cáp)',
    category: 'Chest',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crossover.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Cable-Crossover.gif',
    description: '3D GymVisual animation - Ép ngực tạo khe ngực sâu'
  },
  {
    id: 'gif_pec_deck',
    name: 'Pec Deck Machine (Máy ép ngực)',
    category: 'Chest',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pec-Deck-Fly.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pec-Deck-Fly.gif',
    description: '3D GymVisual animation - Cô lập ngực an toàn'
  },
  {
    id: 'gif_chest_dips',
    name: 'Chest Dips (Xà kép ngực)',
    category: 'Chest',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Chest-Dips.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Chest-Dips.gif',
    description: '3D GymVisual animation - Phát triển ngực dưới và cơ tay sau'
  },
  {
    id: 'gif_push_up',
    name: 'Push Up (Hít đất)',
    category: 'Chest',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Push-Up.gif',
    description: '3D GymVisual animation - Chống đẩy tự thân'
  },

  // BACK
  {
    id: 'gif_pullup',
    name: 'Pull Up (Kéo xà đơn)',
    category: 'Back',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Pull-up.gif',
    description: '3D GymVisual animation - Mở rộng cơ xô hình chữ V'
  },
  {
    id: 'gif_lat_pulldown',
    name: 'Lat Pulldown (Kéo xô cáp)',
    category: 'Back',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lat-Pulldown.gif',
    description: '3D GymVisual animation - Kéo xô ròng rọc trên'
  },
  {
    id: 'gif_bb_row',
    name: 'Barbell Row (Chèo thuyền đòn tạ)',
    category: 'Back',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Bent-Over-Row.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Bent-Over-Row.gif',
    description: '3D GymVisual animation - Dày lưng giữa và cơ trám'
  },
  {
    id: 'gif_cable_row',
    name: 'Seated Cable Row (Kéo cáp ngồi)',
    category: 'Back',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Seated-Cable-Row.gif',
    description: '3D GymVisual animation - Kéo cáp ngồi thẳng lưng'
  },
  {
    id: 'gif_deadlift',
    name: 'Barbell Deadlift (Kéo tạ từ sàn)',
    category: 'Back',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Deadlift.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Deadlift.gif',
    description: '3D GymVisual animation - Vua phát triển toàn bộ chuỗi cơ sau'
  },

  // SHOULDERS
  {
    id: 'gif_ohp',
    name: 'Overhead Barbell Press (Đẩy vai đòn)',
    category: 'Shoulders',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Shoulder-Press.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Shoulder-Press.gif',
    description: '3D GymVisual animation - Đẩy vai đứng với thanh đòn'
  },
  {
    id: 'gif_db_shoulder_press',
    name: 'Dumbbell Shoulder Press (Đẩy vai tạ đơn)',
    category: 'Shoulders',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Shoulder-Press.gif',
    description: '3D GymVisual animation - Đẩy vai tạ đơn ngồi ghế tựa'
  },
  {
    id: 'gif_lateral_raise',
    name: 'Dumbbell Lateral Raise (Bay vai ngang)',
    category: 'Shoulders',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Lateral-Raise.gif',
    description: '3D GymVisual animation - Cơ vai giữa hình cầu'
  },
  {
    id: 'gif_face_pull',
    name: 'Face Pull (Kéo cáp vào mặt)',
    category: 'Shoulders',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Face-Pull.gif',
    description: '3D GymVisual animation - Cơ vai sau và chóp xoay vai'
  },
  {
    id: 'gif_arnold_press',
    name: 'Arnold Press (Đẩy vai xoay)',
    category: 'Shoulders',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Arnold-Press.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Arnold-Press.gif',
    description: '3D GymVisual animation - Xoay cổ tay tác động toàn bộ 3 bó vai'
  },

  // LEGS
  {
    id: 'gif_back_squat',
    name: 'Barbell Back Squat (Gánh đùi sau)',
    category: 'Legs',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/BARBELL-SQUAT.gif',
    description: '3D GymVisual animation - Cơ đùi trước và cơ mông'
  },
  {
    id: 'gif_front_squat',
    name: 'Barbell Front Squat (Gánh đùi trước)',
    category: 'Legs',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Front-Squat.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Front-Squat.gif',
    description: '3D GymVisual animation - Tập trung cao độ vào đùi trước (Quads)'
  },
  {
    id: 'gif_leg_press',
    name: 'Leg Press (Máy đạp đùi)',
    category: 'Legs',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Press.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Leg-Press.gif',
    description: '3D GymVisual animation - Đạp tạ đùi 45 độ'
  },
  {
    id: 'gif_rdl',
    name: 'Romanian Deadlift (RDL)',
    category: 'Legs',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Romanian-Deadlift.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Romanian-Deadlift.gif',
    description: '3D GymVisual animation - Kéo giãn cơ đùi sau (Hamstrings)'
  },
  {
    id: 'gif_leg_ext',
    name: 'Leg Extension (Máy đá đùi trước)',
    category: 'Legs',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/LEG-EXTENSION.gif',
    description: '3D GymVisual animation - Cô lập cơ tứ đầu đùi'
  },
  {
    id: 'gif_leg_curl',
    name: 'Leg Curl (Máy móc đùi sau)',
    category: 'Legs',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lying-Leg-Curl.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lying-Leg-Curl.gif',
    description: '3D GymVisual animation - Cuộn đùi sau nằm sấp'
  },
  {
    id: 'gif_calf_raise',
    name: 'Standing Calf Raise (Nhón bắp chuối)',
    category: 'Legs',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Standing-Calf-Raise.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Standing-Calf-Raise.gif',
    description: '3D GymVisual animation - Phát triển bắp chân'
  },

  // ARMS
  {
    id: 'gif_bb_curl',
    name: 'Barbell Bicep Curl (Cuốn đòn bắp tay)',
    category: 'Biceps',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif',
    description: '3D GymVisual animation - Tăng khối lượng bắp tay trước'
  },
  {
    id: 'gif_db_curl',
    name: 'Dumbbell Curl (Cuốn tạ đơn)',
    category: 'Biceps',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif',
    description: '3D GymVisual animation - Xoay cổ tay siết đỉnh bắp tay'
  },
  {
    id: 'gif_hammer_curl',
    name: 'Hammer Curl (Cuốn tạ búa)',
    category: 'Biceps',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif',
    description: '3D GymVisual animation - Dày cơ cẳng tay & Brachialis'
  },
  {
    id: 'gif_triceps_pushdown',
    name: 'Triceps Pushdown (Đẩy cáp tay sau)',
    category: 'Triceps',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Tricep-Pushdown.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Tricep-Pushdown.gif',
    description: '3D GymVisual animation - Cơ tay sau hình móng ngựa'
  },
  {
    id: 'gif_skull_crusher',
    name: 'Skull Crusher / Lying Triceps Extension',
    category: 'Triceps',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lying-Triceps-Extension.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Lying-Triceps-Extension.gif',
    description: '3D GymVisual animation - Duỗi tay sau nằm ghế phẳng'
  },
  {
    id: 'gif_overhead_triceps',
    name: 'Overhead Triceps Extension',
    category: 'Triceps',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Overhead-Triceps-Extension.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Overhead-Triceps-Extension.gif',
    description: '3D GymVisual animation - Kéo giãn đầu dài cơ tay sau'
  },

  // CORE
  {
    id: 'gif_plank',
    name: 'Plank (Tư thế tấm ván)',
    category: 'Core',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Plank.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Plank.gif',
    description: '3D GymVisual animation - Gồng cứng cơ bụng lõi'
  },
  {
    id: 'gif_hanging_leg_raise',
    name: 'Hanging Leg Raise (Treo xà cuộn bụng)',
    category: 'Core',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Hanging-Leg-Raise.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Hanging-Leg-Raise.gif',
    description: '3D GymVisual animation - Cuộn cơ bụng dưới 6 múi'
  },
  {
    id: 'gif_ab_rollout',
    name: 'Ab Wheel Rollout (Lăn con lăn bụng)',
    category: 'Core',
    url: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Ab-Wheel-Rollout.gif',
    thumbnailUrl: 'https://fitnessprogramer.com/wp-content/uploads/2021/02/Ab-Wheel-Rollout.gif',
    description: '3D GymVisual animation - Đỉnh cao sức mạnh cơ lõi'
  }
];

// Helper to create exercise images with 3D GymVisual Animated GIF as default
export function createExerciseImages(
  name: string,
  primaryMuscle: MuscleGroup,
  customImageUrl?: string
): ExerciseImage[] {
  const fallbackSvg = getMuscleSvgFallback(primaryMuscle);

  if (customImageUrl && customImageUrl.trim()) {
    return [
      {
        id: `img_${Date.now()}`,
        url: customImageUrl.trim(),
        thumbnailUrl: customImageUrl.trim(),
        fallbackSvg,
        type: 'image',
        provider: 'custom',
        altText: name,
      }
    ];
  }

  // Find GymVisual 3D Animated GIF
  const gifUrl = GYMVISUAL_ANIMATED_GIFS[name] || 
    GYMVISUAL_ANIMATED_GIFS[Object.keys(GYMVISUAL_ANIMATED_GIFS).find(k => k.toLowerCase() === name.toLowerCase()) || ''] ||
    `https://fitnessprogramer.com/wp-content/uploads/2021/02/${encodeURIComponent(name.replace(/\s+/g, '-'))}.gif`;

  return [
    {
      id: `img_${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      url: gifUrl,
      thumbnailUrl: gifUrl,
      fallbackSvg,
      type: 'gif',
      provider: 'gymvisual',
      altText: name,
    }
  ];
}
