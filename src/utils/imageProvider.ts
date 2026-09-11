// ==========================================
// EXERCISE IMAGE SYSTEM & ACCURATE ANATOMICAL ILLUSTRATION GENERATOR
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

// Generate highly accurate, crisp, modern SVG illustration for specific exercise movements
export function generateAccurateExerciseSvg(name: string, primaryMuscle: MuscleGroup): string {
  const cleanName = name.toLowerCase();

  // Muscle color palette
  const colors = {
    chest: '#EF4444',
    back: '#3B82F6',
    shoulders: '#F59E0B',
    quads: '#10B981',
    hamstrings: '#059669',
    biceps: '#8B5CF6',
    triceps: '#EC4899',
    core: '#06B6D4',
    calves: '#84CC16',
    equipment: '#94A3B8',
    bench: '#334155',
    body: '#1E293B',
    highlight: '#F8FAFC',
  };

  let graphicSvg = '';

  // 1. Bench Press / Incline Bench Press
  if (cleanName.includes('bench press') || cleanName.includes('chest press') || cleanName.includes('pec deck') || cleanName.includes('fly')) {
    const isDumbbell = cleanName.includes('dumbbell') || cleanName.includes('db');
    const isIncline = cleanName.includes('incline');
    
    graphicSvg = `
      <!-- Bench -->
      <path d="${isIncline ? 'M20 75 L70 45 L75 52 L25 82 Z' : 'M15 65 L85 65 L85 72 L15 72 Z'}" fill="${colors.bench}" rx="2"/>
      <rect x="25" y="72" width="6" height="20" fill="${colors.bench}" rx="1"/>
      <rect x="70" y="72" width="6" height="20" fill="${colors.bench}" rx="1"/>

      <!-- Body / Head -->
      <circle cx="${isIncline ? '38' : '30'}" cy="${isIncline ? '50' : '58'}" r="7" fill="${colors.body}"/>
      <!-- Torso with Red Chest Highlight -->
      <path d="${isIncline ? 'M42 55 L65 42 L68 56 L45 68 Z' : 'M35 58 L70 58 L68 65 L35 65 Z'}" fill="${colors.chest}" stroke="${colors.highlight}" stroke-width="0.5"/>
      
      <!-- Arms pressing up -->
      <path d="M48 56 L46 32 M58 52 L56 32" stroke="${colors.body}" stroke-width="4" stroke-linecap="round"/>
      <path d="M46 38 L48 56 M56 38 L58 52" stroke="${colors.triceps}" stroke-width="2" stroke-linecap="round"/>

      ${!isDumbbell ? `
        <!-- Barbell & Weight Plates -->
        <line x1="20" y1="30" x2="80" y2="30" stroke="${colors.equipment}" stroke-width="3" stroke-linecap="round"/>
        <rect x="23" y="22" width="5" height="16" fill="${colors.highlight}" rx="1"/>
        <rect x="72" y="22" width="5" height="16" fill="${colors.highlight}" rx="1"/>
      ` : `
        <!-- Dumbbells -->
        <rect x="41" y="27" width="10" height="4" fill="${colors.equipment}" rx="1"/>
        <circle cx="41" cy="29" r="4" fill="${colors.highlight}"/>
        <circle cx="51" cy="29" r="4" fill="${colors.highlight}"/>
        
        <rect x="53" y="27" width="10" height="4" fill="${colors.equipment}" rx="1"/>
        <circle cx="53" cy="29" r="4" fill="${colors.highlight}"/>
        <circle cx="63" cy="29" r="4" fill="${colors.highlight}"/>
      `}

      <!-- Motion arrows -->
      <path d="M51 40 L51 22 M48 25 L51 22 L54 25" stroke="${colors.chest}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
  }
  // 2. Squat / Front Squat / Leg Press
  else if (cleanName.includes('squat') || cleanName.includes('leg press') || cleanName.includes('bulgarian') || cleanName.includes('lunge')) {
    graphicSvg = `
      <!-- Head -->
      <circle cx="48" cy="28" r="6.5" fill="${colors.body}"/>
      <!-- Torso -->
      <path d="M48 34 L45 52 L40 66" stroke="${colors.body}" stroke-width="6" stroke-linecap="round" fill="none"/>
      
      <!-- Quads & Glutes (Emerald Highlight) -->
      <path d="M45 52 L26 56 L35 78" stroke="${colors.quads}" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M35 78 L38 90 L46 90" stroke="${colors.body}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      
      <!-- Barbell on Shoulders -->
      <line x1="20" y1="34" x2="76" y2="34" stroke="${colors.equipment}" stroke-width="3.5" stroke-linecap="round"/>
      <rect x="22" y="24" width="6" height="20" fill="${colors.highlight}" rx="1.5"/>
      <rect x="68" y="24" width="6" height="20" fill="${colors.highlight}" rx="1.5"/>
      
      <!-- Motion Arrows -->
      <path d="M62 60 L62 44 M59 47 L62 44 L65 47" stroke="${colors.quads}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
  }
  // 3. Deadlift / Romanian Deadlift (RDL)
  else if (cleanName.includes('deadlift') || cleanName.includes('rdl')) {
    graphicSvg = `
      <!-- Head -->
      <circle cx="34" cy="30" r="6.5" fill="${colors.body}"/>
      <!-- Torso / Back (Blue Highlight) -->
      <path d="M36 36 L52 48 L62 62" stroke="${colors.back}" stroke-width="6" stroke-linecap="round" fill="none"/>
      
      <!-- Hamstrings & Glutes (Emerald Highlight) -->
      <path d="M62 62 L66 78 L68 90" stroke="${colors.hamstrings}" stroke-width="6" stroke-linecap="round" fill="none"/>
      
      <!-- Arms hanging holding bar -->
      <path d="M42 42 L48 68 L50 78" stroke="${colors.body}" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      
      <!-- Barbell on ground / shin level -->
      <line x1="25" y1="78" x2="78" y2="78" stroke="${colors.equipment}" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="30" cy="78" r="10" fill="${colors.highlight}" stroke="${colors.equipment}" stroke-width="1.5"/>
      <circle cx="73" cy="78" r="10" fill="${colors.highlight}" stroke="${colors.equipment}" stroke-width="1.5"/>

      <!-- Upward drive arrow -->
      <path d="M38 52 L38 36 M35 39 L38 36 L41 39" stroke="${colors.back}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
  }
  // 4. Pull Up / Chin Up / Lat Pulldown
  else if (cleanName.includes('pull up') || cleanName.includes('pulldown') || cleanName.includes('chin up')) {
    graphicSvg = `
      <!-- Pullup Bar / Cable Machine Top -->
      <line x1="15" y1="18" x2="85" y2="18" stroke="${colors.equipment}" stroke-width="4" stroke-linecap="round"/>
      <rect x="18" y="12" width="4" height="12" fill="${colors.bench}"/>
      <rect x="78" y="12" width="4" height="12" fill="${colors.bench}"/>

      <!-- Hands & Arms pulling down -->
      <path d="M30 18 L38 32 L44 42" stroke="${colors.body}" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M70 18 L62 32 L56 42" stroke="${colors.body}" stroke-width="4" stroke-linecap="round" fill="none"/>
      
      <!-- Head -->
      <circle cx="50" cy="28" r="6.5" fill="${colors.body}"/>
      
      <!-- V-Taper Lats (Blue Highlight) -->
      <path d="M44 36 C42 45, 40 55, 47 64 L53 64 C60 55, 58 45, 56 36 Z" fill="${colors.back}" stroke="${colors.highlight}" stroke-width="0.5"/>

      <!-- Legs hanging -->
      <path d="M47 64 L45 85 M53 64 L55 85" stroke="${colors.body}" stroke-width="4" stroke-linecap="round"/>

      <!-- Motion Arrows -->
      <path d="M50 48 L50 36 M47 39 L50 36 L53 39" stroke="${colors.back}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
  }
  // 5. Rows (Barbell Row, Cable Row, T-Bar, Dumbbell Row)
  else if (cleanName.includes('row')) {
    graphicSvg = `
      <!-- Head -->
      <circle cx="36" cy="32" r="6.5" fill="${colors.body}"/>
      <!-- Torso Bent over (Blue Highlight) -->
      <path d="M38 38 L55 48 L65 62" stroke="${colors.back}" stroke-width="7" stroke-linecap="round" fill="none"/>
      <!-- Legs -->
      <path d="M65 62 L60 76 L62 90" stroke="${colors.body}" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      
      <!-- Arms rowing barbell to chest -->
      <path d="M42 42 L48 56 L44 68" stroke="${colors.biceps}" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      
      <!-- Barbell -->
      <line x1="26" y1="64" x2="68" y2="64" stroke="${colors.equipment}" stroke-width="3.5" stroke-linecap="round"/>
      <rect x="28" y="56" width="5" height="16" fill="${colors.highlight}" rx="1"/>
      <rect x="61" y="56" width="5" height="16" fill="${colors.highlight}" rx="1"/>

      <!-- Arrow pulling up -->
      <path d="M48 64 L48 48 M45 51 L48 48 L51 51" stroke="${colors.back}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
  }
  // 6. Overhead Shoulder Press / DB Press / Arnold Press
  else if (cleanName.includes('overhead') || cleanName.includes('shoulder press') || cleanName.includes('military') || cleanName.includes('arnold')) {
    graphicSvg = `
      <!-- Head -->
      <circle cx="50" cy="38" r="6.5" fill="${colors.body}"/>
      <!-- Torso & Shoulders (Amber Highlight) -->
      <path d="M50 44 L50 68" stroke="${colors.body}" stroke-width="7" stroke-linecap="round"/>
      <path d="M38 46 Q50 42 62 46" stroke="${colors.shoulders}" stroke-width="5" stroke-linecap="round"/>

      <!-- Arms Pressing Overhead -->
      <path d="M38 46 L36 24 M62 46 L64 24" stroke="${colors.triceps}" stroke-width="3.5" stroke-linecap="round"/>
      
      <!-- Barbell Locked Out Overhead -->
      <line x1="20" y1="20" x2="80" y2="20" stroke="${colors.equipment}" stroke-width="3.5" stroke-linecap="round"/>
      <rect x="23" y="12" width="5" height="16" fill="${colors.highlight}" rx="1"/>
      <rect x="72" y="12" width="5" height="16" fill="${colors.highlight}" rx="1"/>

      <!-- Motion Arrow -->
      <path d="M50 32 L50 16 M47 19 L50 16 L53 19" stroke="${colors.shoulders}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
  }
  // 7. Lateral Raise / Rear Delt / Face Pull
  else if (cleanName.includes('lateral raise') || cleanName.includes('rear delt') || cleanName.includes('face pull')) {
    graphicSvg = `
      <!-- Head -->
      <circle cx="50" cy="32" r="6.5" fill="${colors.body}"/>
      <!-- Torso -->
      <path d="M50 38 L50 72" stroke="${colors.body}" stroke-width="6.5" stroke-linecap="round"/>
      <path d="M42 42 Q50 38 58 42" stroke="${colors.shoulders}" stroke-width="5" stroke-linecap="round"/>

      <!-- Arms raised horizontally with Dumbbells -->
      <path d="M42 42 L24 44 M58 42 L76 44" stroke="${colors.body}" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="22" cy="44" r="4.5" fill="${colors.highlight}"/>
      <circle cx="78" cy="44" r="4.5" fill="${colors.highlight}"/>

      <!-- Upward Arc -->
      <path d="M28 56 Q23 48 24 44 M72 56 Q77 48 76 44" stroke="${colors.shoulders}" stroke-width="1.5" stroke-dasharray="2 2" fill="none"/>
    `;
  }
  // 8. Bicep Curls (Barbell Curl, Dumbbell Curl, Hammer, Cable)
  else if (cleanName.includes('curl')) {
    const isHammer = cleanName.includes('hammer');
    graphicSvg = `
      <!-- Head -->
      <circle cx="50" cy="28" r="6.5" fill="${colors.body}"/>
      <!-- Torso -->
      <path d="M50 34 L50 72" stroke="${colors.body}" stroke-width="6.5" stroke-linecap="round"/>
      <!-- Legs -->
      <path d="M46 72 L44 92 M54 72 L56 92" stroke="${colors.body}" stroke-width="4" stroke-linecap="round"/>

      <!-- Upper Arms fixed, Forearms curled (Biceps Purple Peak) -->
      <path d="M44 38 L42 54 L35 42" stroke="${colors.body}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <circle cx="40" cy="48" r="4" fill="${colors.biceps}"/>

      <path d="M56 38 L58 54 L65 42" stroke="${colors.body}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <circle cx="60" cy="48" r="4" fill="${colors.biceps}"/>

      <!-- Dumbbells / Barbell at Chest level -->
      <line x1="30" y1="40" x2="70" y2="40" stroke="${colors.equipment}" stroke-width="3" stroke-linecap="round"/>
      <circle cx="30" cy="40" r="4" fill="${colors.highlight}"/>
      <circle cx="70" cy="40" r="4" fill="${colors.highlight}"/>

      <!-- Curl Arc Arrow -->
      <path d="M33 58 C30 50, 31 43, 34 40" stroke="${colors.biceps}" stroke-width="1.8" stroke-linecap="round" fill="none"/>
    `;
  }
  // 9. Tricep Extension / Pushdown / Skull Crusher
  else if (cleanName.includes('triceps') || cleanName.includes('pushdown') || cleanName.includes('skull crusher')) {
    graphicSvg = `
      <!-- Head -->
      <circle cx="50" cy="28" r="6.5" fill="${colors.body}"/>
      <!-- Torso -->
      <path d="M50 34 L50 72" stroke="${colors.body}" stroke-width="6.5" stroke-linecap="round"/>

      <!-- Upper Arm fixed, Triceps (Pink Horseshoe) pushing down -->
      <path d="M44 38 L44 54 L44 72" stroke="${colors.body}" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      <path d="M42 42 L42 52" stroke="${colors.triceps}" stroke-width="3.5" stroke-linecap="round"/>

      <path d="M56 38 L56 54 L56 72" stroke="${colors.body}" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      <path d="M58 42 L58 52" stroke="${colors.triceps}" stroke-width="3.5" stroke-linecap="round"/>

      <!-- Cable Bar / Rope at Bottom -->
      <line x1="38" y1="72" x2="62" y2="72" stroke="${colors.equipment}" stroke-width="3" stroke-linecap="round"/>

      <!-- Pushdown Arrow -->
      <path d="M50 56 L50 68 M47 65 L50 68 L53 65" stroke="${colors.triceps}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    `;
  }
  // 10. Leg Extension / Leg Curl / Calf Raise
  else if (cleanName.includes('leg extension') || cleanName.includes('leg curl') || cleanName.includes('calf')) {
    graphicSvg = `
      <!-- Head -->
      <circle cx="36" cy="36" r="6" fill="${colors.body}"/>
      <!-- Torso seated on machine -->
      <path d="M38 42 L46 58 L64 58" stroke="${colors.body}" stroke-width="6" stroke-linecap="round" fill="none"/>
      
      <!-- Quads / Calves Highlight -->
      <path d="M46 58 L64 58" stroke="${colors.quads}" stroke-width="6" stroke-linecap="round"/>
      <path d="M64 58 L78 52" stroke="${colors.calves}" stroke-width="5" stroke-linecap="round"/>

      <!-- Machine Pad / Roller -->
      <circle cx="76" cy="54" r="5" fill="${colors.highlight}" stroke="${colors.equipment}" stroke-width="1.5"/>

      <!-- Extension upward motion -->
      <path d="M68 66 Q76 64 78 52" stroke="${colors.quads}" stroke-width="2" stroke-linecap="round" fill="none"/>
    `;
  }
  // 11. Core / Plank / Ab Rollout / Leg Raise
  else if (cleanName.includes('plank') || cleanName.includes('abs') || cleanName.includes('leg raise') || cleanName.includes('rollout')) {
    graphicSvg = `
      <!-- Head -->
      <circle cx="25" cy="52" r="6" fill="${colors.body}"/>
      <!-- Arms on Floor -->
      <path d="M28 58 L32 68 L40 68" stroke="${colors.body}" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      
      <!-- Plank Straight Torso with Cyan Core Highlight -->
      <path d="M32 58 L52 58 L75 66" stroke="${colors.core}" stroke-width="6" stroke-linecap="round" fill="none"/>
      
      <!-- Feet on floor -->
      <path d="M75 66 L82 70" stroke="${colors.body}" stroke-width="3.5" stroke-linecap="round"/>
      <!-- Floor Line -->
      <line x1="15" y1="72" x2="88" y2="72" stroke="${colors.equipment}" stroke-width="2" stroke-dasharray="3 3"/>
    `;
  }
  // Default Generic Anatomical Silhouette
  else {
    const mainColor = colors.chest;
    graphicSvg = `
      <circle cx="50" cy="25" r="9" fill="${colors.body}"/>
      <path d="M35 38 C35 35, 65 35, 65 38 L68 65 C68 67, 62 69, 50 69 C38 69, 32 67, 32 65 Z" fill="${colors.body}" stroke="${colors.highlight}" stroke-width="0.5"/>
      <circle cx="50" cy="50" r="12" fill="${mainColor}" fill-opacity="0.6"/>
    `;
  }

  // Construct full SVG string
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none">
    <!-- Dark High-Tech Background Card -->
    <rect width="100" height="100" rx="16" fill="#0D1117"/>
    <rect x="1" y="1" width="98" height="98" rx="15" stroke="#222A3A" stroke-width="1.5"/>

    <!-- Subtle Grid Overlay -->
    <line x1="0" y1="50" x2="100" y2="50" stroke="#181F2C" stroke-width="0.5"/>
    <line x1="50" y1="0" x2="50" y2="100" stroke="#181F2C" stroke-width="0.5"/>

    ${graphicSvg}

    <!-- Target Muscle Label Tag -->
    <rect x="10" y="82" width="80" height="13" rx="4" fill="#131822" stroke="#222A3A" stroke-width="0.75"/>
    <text x="50" y="91.5" text-anchor="middle" fill="#10B981" font-family="system-ui, -apple-system, sans-serif" font-weight="800" font-size="6.5" letter-spacing="0.5">${primaryMuscle.toUpperCase()}</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;
}

// Global Preset Illustrations for user selection
export const PRESET_ILLUSTRATIONS: PresetIllustration[] = [
  // CHEST
  {
    id: 'preset_bench_press',
    name: 'Barbell Flat Bench Press',
    category: 'Chest',
    url: generateAccurateExerciseSvg('Barbell Bench Press', 'Chest'),
    thumbnailUrl: generateAccurateExerciseSvg('Barbell Bench Press', 'Chest'),
    description: 'Đẩy ngực ngang với đòn tạ (Pectoralis Major focus)'
  },
  {
    id: 'preset_incline_press',
    name: 'Incline Bench Press (30° - 45°)',
    category: 'Chest',
    url: generateAccurateExerciseSvg('Incline Bench Press', 'Chest'),
    thumbnailUrl: generateAccurateExerciseSvg('Incline Bench Press', 'Chest'),
    description: 'Đẩy ngực trên ghế dốc (Clavicular Head focus)'
  },
  {
    id: 'preset_db_press',
    name: 'Dumbbell Chest Press',
    category: 'Chest',
    url: generateAccurateExerciseSvg('Dumbbell Bench Press', 'Chest'),
    thumbnailUrl: generateAccurateExerciseSvg('Dumbbell Bench Press', 'Chest'),
    description: 'Đẩy ngực với tạ đơn tăng biên độ chuyển động'
  },
  {
    id: 'preset_cable_fly',
    name: 'Cable / Machine Fly',
    category: 'Chest',
    url: generateAccurateExerciseSvg('Cable Fly', 'Chest'),
    thumbnailUrl: generateAccurateExerciseSvg('Cable Fly', 'Chest'),
    description: 'Ép ngực cô lập với máy cáp hoặc Pec Deck'
  },

  // BACK
  {
    id: 'preset_pullup',
    name: 'Pull Up / Lat Pulldown',
    category: 'Back',
    url: generateAccurateExerciseSvg('Pull Up', 'Back'),
    thumbnailUrl: generateAccurateExerciseSvg('Pull Up', 'Back'),
    description: 'Kéo xà đơn & Kéo xô phát triển độ rộng lưng'
  },
  {
    id: 'preset_bb_row',
    name: 'Barbell Bent Over Row',
    category: 'Back',
    url: generateAccurateExerciseSvg('Barbell Row', 'Back'),
    thumbnailUrl: generateAccurateExerciseSvg('Barbell Row', 'Back'),
    description: 'Chèo thuyền đòn tạ tăng độ dày lưng giữa và xô'
  },
  {
    id: 'preset_deadlift',
    name: 'Conventional & Sumo Deadlift',
    category: 'Back',
    url: generateAccurateExerciseSvg('Deadlift', 'Back'),
    thumbnailUrl: generateAccurateExerciseSvg('Deadlift', 'Back'),
    description: 'Kéo tạ từ sàn phát triển toàn bộ chuỗi cơ sau'
  },

  // SHOULDERS
  {
    id: 'preset_ohp',
    name: 'Overhead Barbell Press',
    category: 'Shoulders',
    url: generateAccurateExerciseSvg('Overhead Press', 'Shoulders'),
    thumbnailUrl: generateAccurateExerciseSvg('Overhead Press', 'Shoulders'),
    description: 'Đẩy vai qua đầu tăng sức mạnh cơ vai trước và giữa'
  },
  {
    id: 'preset_lateral_raise',
    name: 'Dumbbell Lateral Raise',
    category: 'Shoulders',
    url: generateAccurateExerciseSvg('Lateral Raise', 'Shoulders'),
    thumbnailUrl: generateAccurateExerciseSvg('Lateral Raise', 'Shoulders'),
    description: 'Nâng tạ sang ngang tạo bờ vai rộng hình cầu'
  },
  {
    id: 'preset_face_pull',
    name: 'Face Pull / Rear Delt Fly',
    category: 'Shoulders',
    url: generateAccurateExerciseSvg('Face Pull', 'Shoulders'),
    thumbnailUrl: generateAccurateExerciseSvg('Face Pull', 'Shoulders'),
    description: 'Tác động cơ vai sau và chóp xoay vai'
  },

  // LEGS
  {
    id: 'preset_back_squat',
    name: 'Barbell Back Squat',
    category: 'Legs',
    url: generateAccurateExerciseSvg('Back Squat', 'Legs'),
    thumbnailUrl: generateAccurateExerciseSvg('Back Squat', 'Legs'),
    description: 'Vua của các bài tập thân dưới (Quads & Glutes)'
  },
  {
    id: 'preset_rdl',
    name: 'Romanian Deadlift (RDL)',
    category: 'Legs',
    url: generateAccurateExerciseSvg('Romanian Deadlift', 'Legs'),
    thumbnailUrl: generateAccurateExerciseSvg('Romanian Deadlift', 'Legs'),
    description: 'Gập hông kéo giãn đùi sau và siết mông'
  },
  {
    id: 'preset_leg_ext',
    name: 'Leg Extension & Leg Curl',
    category: 'Legs',
    url: generateAccurateExerciseSvg('Leg Extension', 'Legs'),
    thumbnailUrl: generateAccurateExerciseSvg('Leg Extension', 'Legs'),
    description: 'Máy đá đùi trước và móc đùi sau'
  },

  // ARMS
  {
    id: 'preset_bicep_curl',
    name: 'Bicep Barbell & DB Curl',
    category: 'Biceps',
    url: generateAccurateExerciseSvg('Barbell Curl', 'Biceps'),
    thumbnailUrl: generateAccurateExerciseSvg('Barbell Curl', 'Biceps'),
    description: 'Cuốn tạ phát triển cơ bắp tay trước'
  },
  {
    id: 'preset_tricep_ext',
    name: 'Triceps Pushdown & Extension',
    category: 'Triceps',
    url: generateAccurateExerciseSvg('Triceps Pushdown', 'Triceps'),
    thumbnailUrl: generateAccurateExerciseSvg('Triceps Pushdown', 'Triceps'),
    description: 'Duỗi tay sau hình móng ngựa (Horseshoe triceps)'
  },

  // CORE
  {
    id: 'preset_plank',
    name: 'Plank & Hanging Leg Raise',
    category: 'Core',
    url: generateAccurateExerciseSvg('Plank', 'Core'),
    thumbnailUrl: generateAccurateExerciseSvg('Plank', 'Core'),
    description: 'Gồng cơ bụng lõi và cuộn cơ bụng 6 múi'
  }
];

export function getMuscleSvgFallback(primaryMuscle: MuscleGroup): string {
  return generateAccurateExerciseSvg(primaryMuscle, primaryMuscle);
}

// Generate image list for an exercise
export function createExerciseImages(
  name: string,
  primaryMuscle: MuscleGroup,
  customImageUrl?: string
): ExerciseImage[] {
  const accurateSvg = generateAccurateExerciseSvg(name, primaryMuscle);

  if (customImageUrl && customImageUrl.trim()) {
    return [
      {
        id: `img_${Date.now()}`,
        url: customImageUrl.trim(),
        thumbnailUrl: customImageUrl.trim(),
        fallbackSvg: accurateSvg,
        type: 'image',
        provider: 'custom',
        altText: name,
      }
    ];
  }

  return [
    {
      id: `img_${name.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
      url: accurateSvg,
      thumbnailUrl: accurateSvg,
      fallbackSvg: accurateSvg,
      type: 'svg',
      provider: 'local',
      altText: name,
    }
  ];
}
