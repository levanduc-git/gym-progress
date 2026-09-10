// ==========================================
// GYM PROGRESS SEED DATABASE (55+ EXERCISES & 3 TEMPLATES)
// ==========================================

import { Exercise, Program } from './schema';
import { createExerciseImages } from '../utils/imageProvider';

export const SEED_EXERCISES: Exercise[] = [
  // ================= CHEST =================
  {
    id: 'ex_bb_bench_press',
    name: 'Barbell Bench Press',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Triceps', 'Shoulders'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Nằm trên ghế phẳng, mắt thẳng hàng với thanh đòn.',
      'Hai bàn chân đặt vững trên sàn, ưỡn ngực, hạ và khép 2 bả vai (retract scapula).',
      'Nắm thanh đòn rộng hơn vai một chút, nhấc đòn ra khỏi giá đỡ.',
      'Hít sâu, gồng cơ bụng, hạ thanh đòn có kiểm soát xuống điểm giữa ngực / ngang núm vú.',
      'Đẩy mạnh thanh đòn lên theo đường cong nhẹ về phía trên vai, thở ra ở 2/3 quãng đường.'
    ],
    tips: [
      'Góc giữa cánh tay và thân người nên ở mức 45-75 độ, tránh để cùi chỏ mở 90 độ gây đau khớp vai.',
      'Giữ cổ tay thẳng, đòn tạ tì vào phần gót bàn tay.'
    ],
    commonMistakes: [
      'Nâng mông lên khỏi ghế khi đẩy nặng.',
      'Để thanh đòn dội nảy (bounce) lên từ lồng ngực.',
      'Không khóa bả vai khiến vai bị nhô ra trước.'
    ],
    images: createExerciseImages('Barbell Bench Press', 'Chest'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_incline_bb_bench',
    name: 'Incline Bench Press',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Shoulders', 'Triceps'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Chỉnh ghế dốc góc 30-45 độ.',
      'Nằm ngửa, cố định bả vai, nắm đòn rộng hơn vai.',
      'Hạ đòn chạm phần ngực trên (ngay dưới xương quai xanh).',
      'Đẩy thẳng lên trên có kiểm soát.'
    ],
    tips: ['Góc ghế khoảng 30 độ là tối ưu nhất để kích hoạt ngực trên mà ít áp lực lên khớp vai.'],
    commonMistakes: ['Chỉnh ghế dốc quá cao (>45 độ) khiến bài tập biến thành đẩy vai.'],
    images: createExerciseImages('Incline Bench Press', 'Chest'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_db_bench_press',
    name: 'Dumbbell Bench Press',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Triceps', 'Shoulders'],
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    instructions: [
      'Ngồi trên ghế phẳng cầm 2 tạ đơn đặt trên đầu gối.',
      'Ngả người ra sau đồng thời dùng đùi hất tạ lên vị trí bắt đầu trên ngực.',
      'Hạ tạ xuống hai bên ngực với biên độ sâu hơn so với barbell.',
      'Đẩy tạ lên theo hình vòng cung nhẹ, siết chặt ngực ở đỉnh.'
    ],
    tips: ['Tạ đơn giúp cân bằng sức mạnh 2 bên tay và tăng biên độ chuyển động (ROM).'],
    commonMistakes: ['Để 2 tạ va chạm mạnh vào nhau ở đỉnh chuyển động làm mất độ căng cơ.'],
    images: createExerciseImages('Dumbbell Bench Press', 'Chest'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_incline_db_press',
    name: 'Incline Dumbbell Press',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Shoulders', 'Triceps'],
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    instructions: [
      'Chỉnh ghế góc 30-45 độ, cầm 2 tạ đơn.',
      'Hạ tạ xuống 2 bên ngực trên, cùi chỏ mở góc 45-60 độ.',
      'Dùng ngực trên ép tạ lên cao, kiểm soát nhịp hạ 2-3 giây.'
    ],
    tips: ['Tập trung vào cảm giác kéo căng cơ ngực trên khi hạ tạ.'],
    commonMistakes: ['Cùi chỏ bè ngang 90 độ.'],
    images: createExerciseImages('Incline Dumbbell Press', 'Chest'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_cable_fly',
    name: 'Cable Fly',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Shoulders'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    instructions: [
      'Chỉnh tay kéo cáp ngang ngực hoặc từ trên cao.',
      'Bước 1 chân lên trước để tạo độ vững, khuỷu tay hơi cong nhẹ.',
      'Ép 2 tay về phía trước ngực như đang ôm thân cây lớn.',
      'Giữ 1 giây ở đỉnh để siết cơ, sau đó mở rộng có kiểm soát.'
    ],
    tips: ['Giữ nguyên độ cong cố định của khuỷu tay trong suốt chuyển động.'],
    commonMistakes: ['Duỗi thẳng hoặc gập khuỷu tay quá nhiều biến bài bay thành bài đẩy.'],
    images: createExerciseImages('Cable Fly', 'Chest'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_pec_deck',
    name: 'Pec Deck',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Shoulders'],
    equipment: 'Machine',
    difficulty: 'Beginner',
    instructions: [
      'Chỉnh ghế sao cho tay cầm ngang tầm giữa ngực.',
      'Lưng và đầu ép sát đệm, ưỡn ngực.',
      'Ép 2 tay cầm lại gần nhau, thở ra và siết chặt ngực.',
      'Hít vào và đưa tạ về vị trí ban đầu từ từ.'
    ],
    tips: ['Đây là bài cô lập ngực tuyệt vời để pump cơ cuối buổi tập.'],
    commonMistakes: ['Nhấc vai về phía trước làm mất cô lập ngực.'],
    images: createExerciseImages('Pec Deck', 'Chest'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_dips_chest',
    name: 'Chest Dips',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Triceps', 'Shoulders'],
    equipment: 'Bodyweight',
    difficulty: 'Advanced',
    instructions: [
      'Nắm thanh xà kép, nhảy lên khóa khớp tay.',
      'Nghiêng thân người về phía trước khoảng 30 độ, gập gối bắt chéo chân.',
      'Hạ người xuống đến khi cánh tay tạo góc 90 độ hoặc cẳng tay vuông góc.',
      'Đẩy mạnh lên vị trí ban đầu, tập trung lực vào cơ ngực dưới.'
    ],
    tips: ['Thân người càng nghiêng về trước thì cơ ngực càng được kích hoạt nhiều.'],
    commonMistakes: ['Hạ người quá sâu gây áp lực quá tải cho bao khớp vai.'],
    images: createExerciseImages('Dips', 'Chest'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_push_up',
    name: 'Push Up',
    primaryMuscle: 'Chest',
    secondaryMuscles: ['Triceps', 'Core', 'Shoulders'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    instructions: [
      'Vào tư thế plank cao, 2 tay rộng hơn vai, thân người từ đầu đến gót chân tạo đường thẳng.',
      'Hạ người có kiểm soát đến khi ngực cách sàn 2-3 cm.',
      'Đẩy dứt khoát lên vị trí ban đầu.'
    ],
    tips: ['Gồng chặt cơ mông và cơ bụng để tránh bị võng lưng.'],
    commonMistakes: ['Võng thắt lưng hoặc nhô mông lên quá cao.'],
    images: createExerciseImages('Push Up', 'Chest'),
    createdAt: new Date().toISOString()
  },

  // ================= BACK =================
  {
    id: 'ex_pull_up',
    name: 'Pull Up',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Biceps', 'Forearms', 'Core'],
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    instructions: [
      'Nắm thanh xà đơn với lòng bàn tay hướng ra ngoài (pronated grip), rộng hơn vai.',
      'Treo người thả lỏng, sau đó chủ động kích hoạt cơ xô (depress scapula).',
      'Kéo người lên cho đến khi cằm vượt qua thanh xà, cùi chỏ kéo xuống sát hông.',
      'Hạ người xuống từ từ có kiểm soát về vị trí ban đầu (Dead hang).'
    ],
    tips: ['Tưởng tượng bạn đang kéo cùi chỏ xuống túi quần thay vì kéo bằng lực bàn tay.'],
    commonMistakes: ['Dùng quán tính giật người (kipping) không đúng kỹ thuật.'],
    images: createExerciseImages('Pull Up', 'Back'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_lat_pulldown',
    name: 'Lat Pulldown',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Biceps', 'Shoulders'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    instructions: [
      'Chỉnh đệm đùi cố định chân chắc chắn.',
      'Nắm thanh đòn rộng hơn vai, ngồi thẳng, ngực hơi ưỡn và người hơi ngả nhẹ ra sau (10-15 độ).',
      'Kéo thanh đòn xuống chạm phần ngực trên, siết chặt cơ lưng xô 1 giây.',
      'Từ từ nhả thanh đòn về vị trí ban đầu, cảm nhận độ giãn của cơ xô.'
    ],
    tips: ['Giữ cổ tay thẳng, không kéo thanh đòn xuống quá sâu đến bụng.'],
    commonMistakes: ['Kéo thanh đòn ra sau gáy (Behind the neck pulldown) gây hại khớp cổ.'],
    images: createExerciseImages('Lat Pulldown', 'Back'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_bb_row',
    name: 'Barbell Row',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Biceps', 'Forearms', 'Core'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Đứng rộng bằng vai, gập hông (hip hinge) lưng nghiêng khoảng 45 độ so với mặt sàn, lưng thẳng.',
      'Nắm đòn rộng hơn vai, kéo thanh đòn về phía rốn hoặc xương mu.',
      'Ép chặt 2 bả vai lại với nhau ở đỉnh chuyển động.',
      'Hạ tạ có kiểm soát, duy trì cột sống trung tính.'
    ],
    tips: ['Luôn gồng chặt cơ bụng core để bảo vệ vùng lưng dưới.'],
    commonMistakes: ['Cong lưng tôm hoặc đứng quá thẳng khi kéo.'],
    images: createExerciseImages('Barbell Row', 'Back'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_seated_cable_row',
    name: 'Seated Cable Row',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Biceps', 'Shoulders'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    instructions: [
      'Ngồi vào máy, chân đặt lên bục với gối hơi gập nhẹ.',
      'Cầm tay nắm chữ V, ngồi thẳng lưng, ưỡn ngực.',
      'Kéo tay cầm về phía bụng dưới, ép 2 bả vai ra sau.',
      'Nhả tạ từ từ về trước, để cơ lưng được kéo giãn hoàn toàn.'
    ],
    tips: ['Giữ thân người cố định, không đung đưa lưng theo nhịp kéo.'],
    commonMistakes: ['Dùng đà thân người ngả ra sau quá nhiều để kéo tạ nặng.'],
    images: createExerciseImages('Seated Cable Row', 'Back'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_deadlift',
    name: 'Deadlift',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Legs', 'Core', 'Forearms'],
    equipment: 'Barbell',
    difficulty: 'Advanced',
    instructions: [
      'Đứng thẳng, chân rộng bằng hông, thanh đòn cắt ngang giữa mu bàn chân.',
      'Gập hông và hạ gối nắm thanh đòn sát ngoài cẳng chân.',
      'Ưỡn ngực, khóa lưng thẳng, hít sâu nén bụng (valsalva maneuver).',
      'Đạp mạnh sàn bằng gót chân, giữ đòn bám sát ống chân và đùi khi đứng thẳng dậy.',
      'Khóa hông ở đỉnh (không ngửa lưng ra sau), hạ tạ có kiểm soát theo đường thẳng.'
    ],
    tips: ['Nghĩ đến việc đạp sàn ra xa thay vì dùng tay nhấc thanh tạ lên.'],
    commonMistakes: ['Cong lưng dưới khi nhấc tạ, đòn tạ rời xa chân.'],
    images: createExerciseImages('Deadlift', 'Back'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_chest_supported_row',
    name: 'Chest Supported Row',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Biceps', 'Shoulders'],
    equipment: 'Machine',
    difficulty: 'Beginner',
    instructions: [
      'Nằm áp ngực vào ghế dốc hoặc máy tạ chuyên dụng.',
      'Cầm tay nắm, kéo cùi chỏ ra sau ép chặt bả vai.',
      'Tập trung vào chuyển động của cơ lưng giữa và trám mà không bị áp lực lên cột sống.'
    ],
    tips: ['Lựa chọn tuyệt vời cho người có vấn đề về thắt lưng.'],
    commonMistakes: ['Nhấc ngực rời khỏi đệm tì.'],
    images: createExerciseImages('Chest Supported Row', 'Back'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_single_arm_db_row',
    name: 'Single Arm Dumbbell Row',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Biceps', 'Core'],
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    instructions: [
      'Chống 1 tay và 1 đầu gối lên ghế phẳng, lưng song song sàn.',
      'Tay còn lại cầm tạ đơn buông thẳng xuống.',
      'Kéo tạ đơn về phía hông theo quỹ đạo vòng cung nhẹ, ép cơ xô.',
      'Hạ tạ xuống từ từ cảm nhận độ giãn sâu.'
    ],
    tips: ['Kéo tạ về hông thay vì kéo thẳng lên nách để ăn nhiều vào xô.'],
    commonMistakes: ['Xoay vặn toàn bộ thân người khi kéo.'],
    images: createExerciseImages('Single Arm Dumbbell Row', 'Back'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_tbar_row',
    name: 'T-Bar Row',
    primaryMuscle: 'Back',
    secondaryMuscles: ['Biceps', 'Shoulders', 'Core'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Kẹp thanh đòn giữa hai chân hoặc dùng máy T-bar chuyên dụng.',
      'Gập hông 45 độ, nắm tay cầm chữ V.',
      'Kéo tạ về chạm bụng/ngực dưới, siết chặt cơ lưng giữa.',
      'Hạ tạ có kiểm soát.'
    ],
    tips: ['Giữ đầu gối hơi chùng để ổn định trọng tâm.'],
    commonMistakes: ['Giật mạnh người lên khi tạ quá nặng.'],
    images: createExerciseImages('T-Bar Row', 'Back'),
    createdAt: new Date().toISOString()
  },

  // ================= SHOULDERS =================
  {
    id: 'ex_overhead_press',
    name: 'Overhead Press',
    primaryMuscle: 'Shoulders',
    secondaryMuscles: ['Triceps', 'Core'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Đứng thẳng, 2 chân rộng bằng vai, nắm đòn tạ ở ngay trên xương quai xanh.',
      'Gồng chặt mông và cơ bụng, hơi ngả đầu ra sau để nhường đường cho thanh đòn.',
      'Đẩy thanh đòn thẳng đứng lên trên đỉnh đầu.',
      'Khi đòn qua đỉnh đầu, đưa đầu về vị trí trung tính và khóa tay an toàn.',
      'Hạ đòn về lại xương quai xanh có kiểm soát.'
    ],
    tips: ['Gồng mông và đùi thật chặt để tạo bệ đỡ vững chắc cho cơ thể.'],
    commonMistakes: ['Ưỡn lưng dưới quá mức để đẩy tạ lên.'],
    images: createExerciseImages('Overhead Press', 'Shoulders'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_db_shoulder_press',
    name: 'Dumbbell Shoulder Press',
    primaryMuscle: 'Shoulders',
    secondaryMuscles: ['Triceps'],
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    instructions: [
      'Ngồi trên ghế tựa lưng thẳng 75-85 độ, cầm 2 tạ đơn ngang vai.',
      'Đẩy 2 tạ thẳng lên cao cho đến khi tay gần như thẳng.',
      'Hạ tạ xuống từ từ đến khi tạ ngang tầm tai hoặc cằm.'
    ],
    tips: ['Cùi chỏ hơi hướng về phía trước khoảng 30 độ (Scapular plane) thay vì mở rộng sang 2 bên.'],
    commonMistakes: ['Hạ tạ quá nông hoặc để tạ đập vào nhau ở đỉnh.'],
    images: createExerciseImages('Dumbbell Shoulder Press', 'Shoulders'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_lateral_raise',
    name: 'Lateral Raise',
    primaryMuscle: 'Shoulders',
    secondaryMuscles: ['Forearms'],
    equipment: 'Dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Đứng thẳng, chân rộng bằng vai, cầm 2 quả tạ đơn ở hai bên đùi.',
      'Khuỷu tay hơi cong nhẹ, nâng 2 tay sang 2 bên đến khi tay song song với sàn.',
      'Giữ 0.5 giây ở đỉnh, tập trung cảm nhận bó cơ vai giữa (Lateral Delt).',
      'Hạ tạ xuống chậm 2-3 giây có kiểm soát.'
    ],
    tips: ['Nâng tạ theo mặt phẳng bả vai (hơi chéo về trước 15-20 độ). Tưởng tượng như đang rót nước từ bình.'],
    commonMistakes: ['Dùng quán tính nhún gối vung tạ, nâng tạ cao quá đầu.'],
    images: createExerciseImages('Lateral Raise', 'Shoulders'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_rear_delt_fly',
    name: 'Rear Delt Fly',
    primaryMuscle: 'Shoulders',
    secondaryMuscles: ['Back'],
    equipment: 'Dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Gập người về trước song song với sàn hoặc nằm sấp trên ghế dốc.',
      'Cầm tạ đơn, nâng 2 tay sang ngang tập trung vào bó cơ vai sau.',
      'Hạ tạ xuống chậm rãi.'
    ],
    tips: ['Không ép bả vai quá nhiều để giữ lực vào bó cơ vai sau thay vì cơ lưng giữa.'],
    commonMistakes: ['Dùng lưng trên để kéo thay vì vai sau.'],
    images: createExerciseImages('Rear Delt Fly', 'Shoulders'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_face_pull',
    name: 'Face Pull',
    primaryMuscle: 'Shoulders',
    secondaryMuscles: ['Back'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    instructions: [
      'Chỉnh cáp ngang tầm mắt, gắn dây thừng kéo.',
      'Nắm 2 đầu dây bằng ngón tay cái hướng ra sau.',
      'Kéo dây về phía mắt/trán đồng thời xoay cổ tay ra ngoài.',
      'Ép chặt vai sau và cơ chóp xoay (rotator cuff) 1 giây.'
    ],
    tips: ['Bài tập số 1 giúp cải thiện tư thế gù lưng và bảo vệ khớp vai khỏe mạnh.'],
    commonMistakes: ['Tập quá nặng làm thân người giật lùi.'],
    images: createExerciseImages('Face Pull', 'Shoulders'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_arnold_press',
    name: 'Arnold Press',
    primaryMuscle: 'Shoulders',
    secondaryMuscles: ['Triceps'],
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    instructions: [
      'Ngồi trên ghế, bắt đầu với tạ đơn ngang ngực, lòng bàn tay hướng vào trong mặt.',
      'Khi đẩy tạ lên cao, đồng thời xoay cổ tay 180 độ sao cho lòng bàn tay hướng ra trước ở đỉnh.',
      'Xoay ngược lại khi hạ tạ về vị trí ban đầu.'
    ],
    tips: ['Chuyển động xoay mượt mà, không vội vàng.'],
    commonMistakes: ['Khóa cứng khớp cùi chỏ ở đỉnh.'],
    images: createExerciseImages('Arnold Press', 'Shoulders'),
    createdAt: new Date().toISOString()
  },

  // ================= LEGS =================
  {
    id: 'ex_back_squat',
    name: 'Back Squat',
    primaryMuscle: 'Legs',
    secondaryMuscles: ['Core', 'Calves'],
    equipment: 'Barbell',
    difficulty: 'Advanced',
    instructions: [
      'Đặt thanh đòn trên cơ cầu vai (High bar) hoặc dưới gai bả vai (Low bar).',
      'Đứng chân rộng bằng vai hoặc hơn một chút, mũi chân hơi mở 15-30 độ.',
      'Hít sâu gồng chặt bụng (Bracing), đẩy hông ra sau và gập gối hạ người xuống.',
      'Hạ đến khi nếp gấp hông thấp hơn đầu gối (Parallel hoặc Deep Squat).',
      'Đạp mạnh chân đứng lên dứt khoát, giữ ngực mở và lưng thẳng.'
    ],
    tips: ['Đầu gối luôn hướng theo chiều của mũi chân trong suốt chuyển động.'],
    commonMistakes: ['Đầu gối sụp vào trong (Knee valgus), nhấc gót chân khỏi sàn.'],
    images: createExerciseImages('Back Squat', 'Legs'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_front_squat',
    name: 'Front Squat',
    primaryMuscle: 'Legs',
    secondaryMuscles: ['Core'],
    equipment: 'Barbell',
    difficulty: 'Advanced',
    instructions: [
      'Đặt đòn tạ trên vai trước, giữ bằng đầu ngón tay với cùi chỏ nâng cao song song sàn.',
      'Giữ thân người thẳng đứng tối đa khi hạ người xuống.',
      'Đạp mạnh chân đứng lên.'
    ],
    tips: ['Tập trung nhiều hơn vào cơ đùi trước (Quads) và đòi hỏi cơ lõi cực khỏe.'],
    commonMistakes: ['Hạ cùi chỏ làm thanh đòn tuột khỏi vai.'],
    images: createExerciseImages('Front Squat', 'Legs'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_leg_press',
    name: 'Leg Press',
    primaryMuscle: 'Legs',
    secondaryMuscles: ['Calves'],
    equipment: 'Machine',
    difficulty: 'Beginner',
    instructions: [
      'Ngồi vào máy đạp đùi, lưng và mông ép sát vào đệm.',
      'Đặt 2 bàn chân ở giữa bàn đạp rộng bằng vai.',
      'Mở chốt an toàn, hạ bàn đạp xuống từ từ đến khi gối tạo góc 90 độ.',
      'Đạp bàn đạp lên mạnh mẽ, chú ý KHÔNG khóa khớp gối ở đỉnh.'
    ],
    tips: ['Đặt chân cao hơn trên bàn đạp sẽ kích hoạt nhiều đùi sau và mông; đặt thấp kích hoạt đùi trước.'],
    commonMistakes: ['Khóa chặt khớp gối thẳng băng khi đẩy hết cỡ; nhấc mông lên khỏi đệm.'],
    images: createExerciseImages('Leg Press', 'Legs'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_rdl',
    name: 'Romanian Deadlift',
    primaryMuscle: 'Legs',
    secondaryMuscles: ['Back', 'Forearms'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Đứng thẳng cầm đòn tạ ở ngang đùi, chân rộng bằng hông.',
      'Gối hơi chùng nhẹ và cố định góc gối này.',
      'Đẩy hông tối đa ra phía sau (Hip Hinge), hạ thanh đòn lướt sát đùi xuống dưới gối.',
      'Khi cảm nhận cơ đùi sau (Hamstrings) căng tối đa, siết mông đẩy hông về trước để đứng thẳng.'
    ],
    tips: ['Tập trung vào chuyển động đưa hông ra sau thay vì cúi gập lưng xuống.'],
    commonMistakes: ['Gập gối quá nhiều biến thành squat hoặc cong lưng dưới.'],
    images: createExerciseImages('Romanian Deadlift', 'Legs'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_leg_curl',
    name: 'Leg Curl',
    primaryMuscle: 'Legs',
    secondaryMuscles: ['Calves'],
    equipment: 'Machine',
    difficulty: 'Beginner',
    instructions: [
      'Nằm sấp hoặc ngồi vào máy móc đùi sau, đệm tì ở ngay trên gót chân.',
      'Gập chân lại cuốn tạ về phía mông, siết chặt cơ đùi sau 1 giây.',
      'Nhả tạ từ từ có kiểm soát.'
    ],
    tips: ['Không nhấc hông khỏi đệm khi thực hiện bài nằm cuốn đùi.'],
    commonMistakes: ['Dùng đà giật tạ lên.'],
    images: createExerciseImages('Leg Curl', 'Legs'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_leg_extension',
    name: 'Leg Extension',
    primaryMuscle: 'Legs',
    secondaryMuscles: [],
    equipment: 'Machine',
    difficulty: 'Beginner',
    instructions: [
      'Ngồi vào máy đá đùi trước, chỉnh đệm tựa lưng và đệm chân sát cổ chân.',
      'Đá chân thẳng ra phía trước đến khi chân gần thẳng.',
      'Siết chặt đùi trước 1 giây ở đỉnh rồi hạ xuống chậm 2-3 giây.'
    ],
    tips: ['Bài cô lập hoàn hảo cho cơ tứ đầu đùi (Quadriceps).'],
    commonMistakes: ['Đá giật tạ quá nhanh làm mất áp lực cơ.'],
    images: createExerciseImages('Leg Extension', 'Legs'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_bulgarian_split_squat',
    name: 'Bulgarian Split Squat',
    primaryMuscle: 'Legs',
    secondaryMuscles: ['Core'],
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    instructions: [
      'Đứng trước ghế phẳng, đặt mu bàn chân sau lên ghế.',
      'Hạ người thẳng đứng xuống đến khi đùi trước song song với sàn.',
      'Đạp mạnh bằng toàn bộ bàn chân trước để đứng lên.'
    ],
    tips: ['Nghiêng thân người nhẹ về trước để ăn nhiều mông; đứng thẳng để ăn nhiều đùi trước.'],
    commonMistakes: ['Bước chân trước quá ngắn khiến gối bị ép gắt.'],
    images: createExerciseImages('Bulgarian Split Squat', 'Legs'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_calf_raise',
    name: 'Standing Calf Raise',
    primaryMuscle: 'Calves',
    secondaryMuscles: ['Legs'],
    equipment: 'Machine',
    difficulty: 'Beginner',
    instructions: [
      'Đứng nửa bàn chân trước lên bục, vai đặt dưới đệm máy.',
      'Hạ gót chân xuống sâu nhất có thể để kéo giãn bắp chuối hoàn toàn.',
      'Nhón cao gót chân lên tối đa bằng mũi chân, siết cơ bắp chuối 1-2 giây ở đỉnh.'
    ],
    tips: ['Dừng 1-2 giây ở điểm hạ thấp nhất để triệt tiêu năng lượng đàn hồi của gân Achilles.'],
    commonMistakes: ['Nhún nhảy nảy gót chân liên tục mà không có kiểm soát.'],
    images: createExerciseImages('Calf Raise', 'Calves'),
    createdAt: new Date().toISOString()
  },

  // ================= ARMS (BICEPS & TRICEPS) =================
  {
    id: 'ex_bb_curl',
    name: 'Barbell Curl',
    primaryMuscle: 'Biceps',
    secondaryMuscles: ['Forearms'],
    equipment: 'Barbell',
    difficulty: 'Beginner',
    instructions: [
      'Đứng thẳng, 2 tay nắm thanh đòn EZ hoặc đòn thẳng rộng bằng vai, lòng bàn tay hướng ra trước.',
      'Giữ cùi chỏ cố định sát 2 bên mạn sườn.',
      'Cuốn thanh đòn lên phía ngực, siết chặt bắp tay trước ở đỉnh.',
      'Hạ thanh đòn xuống từ từ về vị trí duỗi thẳng tay.'
    ],
    tips: ['Sử dụng thanh đòn EZ nếu bạn bị mỏi hoặc căng cổ tay khi dùng thanh thẳng.'],
    commonMistakes: ['Đung đưa lưng lấy đà để nhấc tạ nặng.'],
    images: createExerciseImages('Barbell Curl', 'Biceps'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_db_curl',
    name: 'Dumbbell Curl',
    primaryMuscle: 'Biceps',
    secondaryMuscles: ['Forearms'],
    equipment: 'Dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Cầm 2 quả tạ đơn buông thẳng 2 bên hông.',
      'Cuốn từng tay hoặc cả hai tay lên, đồng thời xoay nhẹ cổ tay ra ngoài (supination).',
      'Hạ tạ có kiểm soát.'
    ],
    tips: ['Xoay cổ tay ở đỉnh giúp bắp tay trước đạt trạng thái co thắt tối đa.'],
    commonMistakes: ['Cùi chỏ bị đưa về phía trước quá nhiều.'],
    images: createExerciseImages('Dumbbell Curl', 'Biceps'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_hammer_curl',
    name: 'Hammer Curl',
    primaryMuscle: 'Biceps',
    secondaryMuscles: ['Forearms'],
    equipment: 'Dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Cầm 2 tạ đơn với lòng bàn tay hướng vào nhau (Neutral grip).',
      'Cuốn tạ lên như động tác vung búa, giữ cổ tay trung tính.',
      'Hạ tạ xuống từ từ.'
    ],
    tips: ['Phát triển vượt trội cơ Brachialis và cơ cẳng tay (Brachioradialis), giúp tay dày dặn hơn.'],
    commonMistakes: ['Vung người lấy đà.'],
    images: createExerciseImages('Hammer Curl', 'Biceps'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_cable_curl',
    name: 'Cable Curl',
    primaryMuscle: 'Biceps',
    secondaryMuscles: ['Forearms'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    instructions: [
      'Gắn thanh kéo vào ròng rọc thấp của máy cáp.',
      'Đứng thẳng, cuốn cáp lên ngực, cáp duy trì độ căng liên tục suốt biên độ.',
      'Nhả cáp xuống chậm rãi.'
    ],
    tips: ['Độ căng của dây cáp giúp cơ bắp luôn chịu áp lực ngay cả ở điểm xuất phát.'],
    commonMistakes: ['Nhấc vai lên khi cuốn tạ.'],
    images: createExerciseImages('Cable Curl', 'Biceps'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_triceps_pushdown',
    name: 'Triceps Pushdown',
    primaryMuscle: 'Triceps',
    secondaryMuscles: ['Forearms'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    instructions: [
      'Gắn thanh đòn thẳng hoặc dây thừng vào ròng rọc trên cao.',
      'Đứng người hơi nghiêng nhẹ về trước, giữ cùi chỏ cố định sát thân người.',
      'Đẩy thanh đòn/dây cáp xuống dưới cho đến khi cánh tay duỗi thẳng hoàn toàn.',
      'Siết chặt bắp tay sau 1 giây, sau đó đưa tay lên từ từ đến góc 90 độ.'
    ],
    tips: ['Khi dùng dây thừng, hãy tách 2 đầu dây ra 2 bên hông ở điểm dưới cùng.'],
    commonMistakes: ['Cùi chỏ di chuyển tự do ra trước và sau làm mất cô lập tay sau.'],
    images: createExerciseImages('Triceps Pushdown', 'Triceps'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_skull_crusher',
    name: 'Skull Crusher',
    primaryMuscle: 'Triceps',
    secondaryMuscles: ['Forearms'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    instructions: [
      'Nằm trên ghế phẳng, cầm thanh đòn EZ thẳng đứng trên ngực.',
      'Giữ cánh tay trên hơi nghiêng về phía sau đầu khoảng 10-15 độ.',
      'Chỉ gập cùi chỏ để hạ đòn tạ xuống sát trán hoặc đỉnh đầu.',
      'Dùng cơ tay sau duỗi cùi chỏ đẩy thanh tạ trở lại vị trí ban đầu.'
    ],
    tips: ['Giữ 2 cùi chỏ khép vào trong, tránh để cùi chỏ bè sang 2 bên.'],
    commonMistakes: ['Để đòn tạ va vào trán khi mỏi cơ; di chuyển toàn bộ khớp vai.'],
    images: createExerciseImages('Skull Crusher', 'Triceps'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_overhead_triceps_ext',
    name: 'Overhead Triceps Extension',
    primaryMuscle: 'Triceps',
    secondaryMuscles: ['Shoulders'],
    equipment: 'Dumbbell',
    difficulty: 'Beginner',
    instructions: [
      'Ngồi hoặc đứng thẳng, 2 tay ôm 1 quả tạ đơn đưa lên qua đầu.',
      'Hạ quả tạ ra phía sau gáy bằng cách gập cùi chỏ.',
      'Đẩy tạ ngược lên trên cao, siết chặt đầu dài của cơ tay sau.'
    ],
    tips: ['Tác động cực tốt vào đầu dài cơ tay sau (Long head triceps).'],
    commonMistakes: ['Cùi chỏ mở quá rộng ra 2 bên.'],
    images: createExerciseImages('Overhead Triceps Extension', 'Triceps'),
    createdAt: new Date().toISOString()
  },

  // ================= CORE & ABS =================
  {
    id: 'ex_hanging_leg_raise',
    name: 'Hanging Leg Raise',
    primaryMuscle: 'Core',
    secondaryMuscles: ['Forearms', 'Legs'],
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    instructions: [
      'Treo người trên thanh xà đơn, người giữ tĩnh.',
      'Chủ động cuộn xương chậu và nâng 2 chân thẳng (hoặc co gối) lên ngang tầm bụng/ngực.',
      'Hạ chân xuống từ từ, không để cơ thể đung đưa theo quán tính.'
    ],
    tips: ['Tập trung vào việc cuộn xương chậu về phía rốn thay vì chỉ nhấc đùi.'],
    commonMistakes: ['Vung vẩy cơ thể lấy đà.'],
    images: createExerciseImages('Push Up', 'Core'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_plank',
    name: 'Plank',
    primaryMuscle: 'Core',
    secondaryMuscles: ['Shoulders', 'Legs'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    instructions: [
      'Chống 2 cẳng tay xuống sàn, khuỷu tay vuông góc ngay dưới vai.',
      'Chân duỗi thẳng, mũi chân chạm sàn.',
      'Gồng chặt toàn bộ cơ bụng, cơ mông và đùi, tạo thành 1 đường thẳng tắp từ đầu đến chân.',
      'Duy trì nhịp thở đều đặn và giữ vững tư thế theo thời gian mục tiêu.'
    ],
    tips: ['Tưởng tượng bạn đang kéo cùi chỏ về phía ngón chân để tăng độ kích hoạt cơ lõi.'],
    commonMistakes: ['Võng thắt lưng hoặc nhô mông lên cao.'],
    images: createExerciseImages('Push Up', 'Core'),
    createdAt: new Date().toISOString()
  },
  {
    id: 'ex_ab_wheel_rollout',
    name: 'Ab Wheel Rollout',
    primaryMuscle: 'Core',
    secondaryMuscles: ['Shoulders', 'Back'],
    equipment: 'Other',
    difficulty: 'Advanced',
    instructions: [
      'Quỳ gối trên thảm, 2 tay nắm bánh xe lăn bụng.',
      'Cuộn nhẹ lưng trên, gồng chặt cơ bụng.',
      'Lăn bánh xe từ từ về phía trước xa nhất có thể trong tầm kiểm soát.',
      'Dùng cơ bụng gồng kéo bánh xe lăn trở lại vị trí ban đầu.'
    ],
    tips: ['Không để lưng bị võng xuống sàn khi lăn ra xa.'],
    commonMistakes: ['Lăn quá xa vượt quá khả năng kiểm soát gây đau lưng dưới.'],
    images: createExerciseImages('Push Up', 'Core'),
    createdAt: new Date().toISOString()
  }
];

// ================= 3 COMPLETE PRE-BUILT TEMPLATES =================
export const SEED_PROGRAMS: Program[] = [
  // 1. Push Pull Legs (6 Days)
  {
    id: 'prog_ppl_default',
    name: 'Push Pull Legs (PPL)',
    description: 'Chương trình tập kinh điển 6 ngày/tuần tối ưu hóa tăng cơ bắp (Hypertrophy) và sức mạnh.',
    type: 'PPL',
    daysPerWeek: 6,
    isTemplate: true,
    isCustom: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    workouts: [
      {
        id: 'w_ppl_1',
        programId: 'prog_ppl_default',
        dayNumber: 1,
        name: 'Day 1 — Push A (Chest, Shoulders & Triceps)',
        exercises: [
          { id: 'we_1_1', exerciseId: 'ex_bb_bench_press', targetSets: 4, repRange: '6-8', defaultRestSeconds: 120, order: 1, notes: 'Bài chính, tập trung vào progressive overload' },
          { id: 'we_1_2', exerciseId: 'ex_incline_db_press', targetSets: 3, repRange: '8-12', defaultRestSeconds: 90, order: 2, notes: 'Góc ghế 30 độ' },
          { id: 'we_1_3', exerciseId: 'ex_db_shoulder_press', targetSets: 3, repRange: '8-10', defaultRestSeconds: 90, order: 3 },
          { id: 'we_1_4', exerciseId: 'ex_lateral_raise', targetSets: 4, repRange: '12-15', defaultRestSeconds: 60, order: 4, notes: 'Hạ tạ chậm 2 giây' },
          { id: 'we_1_5', exerciseId: 'ex_triceps_pushdown', targetSets: 3, repRange: '10-12', defaultRestSeconds: 60, order: 5 }
        ]
      },
      {
        id: 'w_ppl_2',
        programId: 'prog_ppl_default',
        dayNumber: 2,
        name: 'Day 2 — Pull A (Back, Rear Delts & Biceps)',
        exercises: [
          { id: 'we_2_1', exerciseId: 'ex_pull_up', targetSets: 4, repRange: '6-10', defaultRestSeconds: 120, order: 1, notes: 'Nếu chưa kéo được tự thân hãy dùng máy trợ lực' },
          { id: 'we_2_2', exerciseId: 'ex_bb_row', targetSets: 4, repRange: '8-10', defaultRestSeconds: 90, order: 2 },
          { id: 'we_2_3', exerciseId: 'ex_seated_cable_row', targetSets: 3, repRange: '10-12', defaultRestSeconds: 90, order: 3 },
          { id: 'we_2_4', exerciseId: 'ex_face_pull', targetSets: 3, repRange: '12-15', defaultRestSeconds: 60, order: 4 },
          { id: 'we_2_5', exerciseId: 'ex_bb_curl', targetSets: 3, repRange: '10-12', defaultRestSeconds: 60, order: 5 }
        ]
      },
      {
        id: 'w_ppl_3',
        programId: 'prog_ppl_default',
        dayNumber: 3,
        name: 'Day 3 — Legs A (Quads, Hamstrings & Calves)',
        exercises: [
          { id: 'we_3_1', exerciseId: 'ex_back_squat', targetSets: 4, repRange: '6-8', defaultRestSeconds: 150, order: 1, notes: 'Khởi động kỹ khớp gối và cổ chân' },
          { id: 'we_3_2', exerciseId: 'ex_rdl', targetSets: 3, repRange: '8-10', defaultRestSeconds: 120, order: 2 },
          { id: 'we_3_3', exerciseId: 'ex_leg_press', targetSets: 3, repRange: '10-12', defaultRestSeconds: 90, order: 3 },
          { id: 'we_3_4', exerciseId: 'ex_leg_curl', targetSets: 3, repRange: '12-15', defaultRestSeconds: 60, order: 4 },
          { id: 'we_3_5', exerciseId: 'ex_calf_raise', targetSets: 4, repRange: '15-20', defaultRestSeconds: 60, order: 5 }
        ]
      },
      {
        id: 'w_ppl_4',
        programId: 'prog_ppl_default',
        dayNumber: 4,
        name: 'Day 4 — Rest / Active Recovery',
        isRestDay: true,
        exercises: []
      },
      {
        id: 'w_ppl_5',
        programId: 'prog_ppl_default',
        dayNumber: 5,
        name: 'Day 5 — Push B (Hypertrophy Focus)',
        exercises: [
          { id: 'we_5_1', exerciseId: 'ex_overhead_press', targetSets: 4, repRange: '6-8', defaultRestSeconds: 120, order: 1 },
          { id: 'we_5_2', exerciseId: 'ex_incline_bb_bench', targetSets: 3, repRange: '8-10', defaultRestSeconds: 90, order: 2 },
          { id: 'we_5_3', exerciseId: 'ex_pec_deck', targetSets: 3, repRange: '12-15', defaultRestSeconds: 60, order: 3 },
          { id: 'we_5_4', exerciseId: 'ex_lateral_raise', targetSets: 4, repRange: '15', defaultRestSeconds: 60, order: 4 },
          { id: 'we_5_5', exerciseId: 'ex_skull_crusher', targetSets: 3, repRange: '10-12', defaultRestSeconds: 60, order: 5 }
        ]
      },
      {
        id: 'w_ppl_6',
        programId: 'prog_ppl_default',
        dayNumber: 6,
        name: 'Day 6 — Pull B (Lats & Arms Focus)',
        exercises: [
          { id: 'we_6_1', exerciseId: 'ex_deadlift', targetSets: 3, repRange: '5', defaultRestSeconds: 180, order: 1, notes: 'Tập trung sức mạnh bùng nổ' },
          { id: 'we_6_2', exerciseId: 'ex_lat_pulldown', targetSets: 4, repRange: '8-12', defaultRestSeconds: 90, order: 2 },
          { id: 'we_6_3', exerciseId: 'ex_single_arm_db_row', targetSets: 3, repRange: '10-12', defaultRestSeconds: 90, order: 3 },
          { id: 'we_6_4', exerciseId: 'ex_rear_delt_fly', targetSets: 3, repRange: '15', defaultRestSeconds: 60, order: 4 },
          { id: 'we_6_5', exerciseId: 'ex_hammer_curl', targetSets: 3, repRange: '10-12', defaultRestSeconds: 60, order: 5 }
        ]
      },
      {
        id: 'w_ppl_7',
        programId: 'prog_ppl_default',
        dayNumber: 7,
        name: 'Day 7 — Legs B (Glutes & Quads Pump)',
        exercises: [
          { id: 'we_7_1', exerciseId: 'ex_bulgarian_split_squat', targetSets: 3, repRange: '8-10', defaultRestSeconds: 90, order: 1 },
          { id: 'we_7_2', exerciseId: 'ex_leg_extension', targetSets: 4, repRange: '12-15', defaultRestSeconds: 60, order: 2 },
          { id: 'we_7_3', exerciseId: 'ex_leg_curl', targetSets: 4, repRange: '12-15', defaultRestSeconds: 60, order: 3 },
          { id: 'we_7_4', exerciseId: 'ex_calf_raise', targetSets: 4, repRange: '15-20', defaultRestSeconds: 60, order: 4 },
          { id: 'we_7_5', exerciseId: 'ex_hanging_leg_raise', targetSets: 3, repRange: '12-15', defaultRestSeconds: 60, order: 5 }
        ]
      }
    ]
  },

  // 2. Upper / Lower (4 Days)
  {
    id: 'prog_upper_lower_default',
    name: 'Upper / Lower Split',
    description: 'Chương trình 4 ngày/tuần lý tưởng cân bằng hoàn hảo giữa thời gian phục hồi và tần suất kích thích cơ bắp.',
    type: 'UpperLower',
    daysPerWeek: 4,
    isTemplate: true,
    isCustom: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    workouts: [
      {
        id: 'w_ul_1',
        programId: 'prog_upper_lower_default',
        dayNumber: 1,
        name: 'Day 1 — Upper A (Heavy Power)',
        exercises: [
          { id: 'we_ul_1_1', exerciseId: 'ex_bb_bench_press', targetSets: 4, repRange: '5-8', defaultRestSeconds: 120, order: 1 },
          { id: 'we_ul_1_2', exerciseId: 'ex_bb_row', targetSets: 4, repRange: '6-8', defaultRestSeconds: 120, order: 2 },
          { id: 'we_ul_1_3', exerciseId: 'ex_overhead_press', targetSets: 3, repRange: '8-10', defaultRestSeconds: 90, order: 3 },
          { id: 'we_ul_1_4', exerciseId: 'ex_lat_pulldown', targetSets: 3, repRange: '8-12', defaultRestSeconds: 90, order: 4 },
          { id: 'we_ul_1_5', exerciseId: 'ex_bb_curl', targetSets: 3, repRange: '10-12', defaultRestSeconds: 60, order: 5 },
          { id: 'we_ul_1_6', exerciseId: 'ex_skull_crusher', targetSets: 3, repRange: '10-12', defaultRestSeconds: 60, order: 6 }
        ]
      },
      {
        id: 'w_ul_2',
        programId: 'prog_upper_lower_default',
        dayNumber: 2,
        name: 'Day 2 — Lower A (Squat Focus)',
        exercises: [
          { id: 'we_ul_2_1', exerciseId: 'ex_back_squat', targetSets: 4, repRange: '5-8', defaultRestSeconds: 150, order: 1 },
          { id: 'we_ul_2_2', exerciseId: 'ex_rdl', targetSets: 3, repRange: '8-10', defaultRestSeconds: 120, order: 2 },
          { id: 'we_ul_2_3', exerciseId: 'ex_leg_extension', targetSets: 3, repRange: '12-15', defaultRestSeconds: 60, order: 3 },
          { id: 'we_ul_2_4', exerciseId: 'ex_leg_curl', targetSets: 3, repRange: '12-15', defaultRestSeconds: 60, order: 4 },
          { id: 'we_ul_2_5', exerciseId: 'ex_calf_raise', targetSets: 4, repRange: '15', defaultRestSeconds: 60, order: 5 }
        ]
      },
      {
        id: 'w_ul_3',
        programId: 'prog_upper_lower_default',
        dayNumber: 3,
        name: 'Day 3 — Rest Day',
        isRestDay: true,
        exercises: []
      },
      {
        id: 'w_ul_4',
        programId: 'prog_upper_lower_default',
        dayNumber: 4,
        name: 'Day 4 — Upper B (Hypertrophy & Pump)',
        exercises: [
          { id: 'we_ul_4_1', exerciseId: 'ex_incline_db_press', targetSets: 4, repRange: '8-12', defaultRestSeconds: 90, order: 1 },
          { id: 'we_ul_4_2', exerciseId: 'ex_seated_cable_row', targetSets: 4, repRange: '10-12', defaultRestSeconds: 90, order: 2 },
          { id: 'we_ul_4_3', exerciseId: 'ex_lateral_raise', targetSets: 4, repRange: '12-15', defaultRestSeconds: 60, order: 3 },
          { id: 'we_ul_4_4', exerciseId: 'ex_face_pull', targetSets: 3, repRange: '15', defaultRestSeconds: 60, order: 4 },
          { id: 'we_ul_4_5', exerciseId: 'ex_hammer_curl', targetSets: 3, repRange: '12', defaultRestSeconds: 60, order: 5 },
          { id: 'we_ul_4_6', exerciseId: 'ex_triceps_pushdown', targetSets: 3, repRange: '12', defaultRestSeconds: 60, order: 6 }
        ]
      },
      {
        id: 'w_ul_5',
        programId: 'prog_upper_lower_default',
        dayNumber: 5,
        name: 'Day 5 — Lower B (Deadlift & Posterior Chain)',
        exercises: [
          { id: 'we_ul_5_1', exerciseId: 'ex_deadlift', targetSets: 3, repRange: '5', defaultRestSeconds: 180, order: 1 },
          { id: 'we_ul_5_2', exerciseId: 'ex_leg_press', targetSets: 3, repRange: '10-12', defaultRestSeconds: 90, order: 2 },
          { id: 'we_ul_5_3', exerciseId: 'ex_bulgarian_split_squat', targetSets: 3, repRange: '10', defaultRestSeconds: 90, order: 3 },
          { id: 'we_ul_5_4', exerciseId: 'ex_leg_curl', targetSets: 3, repRange: '12', defaultRestSeconds: 60, order: 4 },
          { id: 'we_ul_5_5', exerciseId: 'ex_plank', targetSets: 3, repRange: '60s', defaultRestSeconds: 60, order: 5 }
        ]
      },
      {
        id: 'w_ul_6',
        programId: 'prog_upper_lower_default',
        dayNumber: 6,
        name: 'Day 6 — Rest Day',
        isRestDay: true,
        exercises: []
      },
      {
        id: 'w_ul_7',
        programId: 'prog_upper_lower_default',
        dayNumber: 7,
        name: 'Day 7 — Rest Day',
        isRestDay: true,
        exercises: []
      }
    ]
  },

  // 3. Full Body (3 Days)
  {
    id: 'prog_full_body_default',
    name: 'Full Body 3 Days',
    description: 'Chương trình 3 ngày/tuần tối ưu cho người bận rộn, kích thích toàn thân mỗi buổi tập.',
    type: 'FullBody',
    daysPerWeek: 3,
    isTemplate: true,
    isCustom: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    workouts: [
      {
        id: 'w_fb_1',
        programId: 'prog_full_body_default',
        dayNumber: 1,
        name: 'Day 1 — Full Body A (Squat & Push Focus)',
        exercises: [
          { id: 'we_fb_1_1', exerciseId: 'ex_back_squat', targetSets: 3, repRange: '6-8', defaultRestSeconds: 120, order: 1 },
          { id: 'we_fb_1_2', exerciseId: 'ex_bb_bench_press', targetSets: 3, repRange: '6-8', defaultRestSeconds: 120, order: 2 },
          { id: 'we_fb_1_3', exerciseId: 'ex_lat_pulldown', targetSets: 3, repRange: '8-10', defaultRestSeconds: 90, order: 3 },
          { id: 'we_fb_1_4', exerciseId: 'ex_lateral_raise', targetSets: 3, repRange: '12-15', defaultRestSeconds: 60, order: 4 },
          { id: 'we_fb_1_5', exerciseId: 'ex_bb_curl', targetSets: 2, repRange: '10-12', defaultRestSeconds: 60, order: 5 }
        ]
      },
      {
        id: 'w_fb_2',
        programId: 'prog_full_body_default',
        dayNumber: 2,
        name: 'Day 2 — Rest Day',
        isRestDay: true,
        exercises: []
      },
      {
        id: 'w_fb_3',
        programId: 'prog_full_body_default',
        dayNumber: 3,
        name: 'Day 3 — Full Body B (Hinge & Pull Focus)',
        exercises: [
          { id: 'we_fb_3_1', exerciseId: 'ex_rdl', targetSets: 3, repRange: '8-10', defaultRestSeconds: 120, order: 1 },
          { id: 'we_fb_3_2', exerciseId: 'ex_bb_row', targetSets: 3, repRange: '8-10', defaultRestSeconds: 90, order: 2 },
          { id: 'we_fb_3_3', exerciseId: 'ex_overhead_press', targetSets: 3, repRange: '8-10', defaultRestSeconds: 90, order: 3 },
          { id: 'we_fb_3_4', exerciseId: 'ex_incline_db_press', targetSets: 3, repRange: '10-12', defaultRestSeconds: 90, order: 4 },
          { id: 'we_fb_3_5', exerciseId: 'ex_triceps_pushdown', targetSets: 2, repRange: '10-12', defaultRestSeconds: 60, order: 5 }
        ]
      },
      {
        id: 'w_fb_4',
        programId: 'prog_full_body_default',
        dayNumber: 4,
        name: 'Day 4 — Rest Day',
        isRestDay: true,
        exercises: []
      },
      {
        id: 'w_fb_5',
        programId: 'prog_full_body_default',
        dayNumber: 5,
        name: 'Day 5 — Full Body C (Leg Press & Arms)',
        exercises: [
          { id: 'we_fb_5_1', exerciseId: 'ex_leg_press', targetSets: 3, repRange: '10-12', defaultRestSeconds: 90, order: 1 },
          { id: 'we_fb_5_2', exerciseId: 'ex_pull_up', targetSets: 3, repRange: '6-8', defaultRestSeconds: 90, order: 2 },
          { id: 'we_fb_5_3', exerciseId: 'ex_db_bench_press', targetSets: 3, repRange: '8-10', defaultRestSeconds: 90, order: 3 },
          { id: 'we_fb_5_4', exerciseId: 'ex_face_pull', targetSets: 3, repRange: '12-15', defaultRestSeconds: 60, order: 4 },
          { id: 'we_fb_5_5', exerciseId: 'ex_hammer_curl', targetSets: 2, repRange: '12', defaultRestSeconds: 60, order: 5 }
        ]
      },
      {
        id: 'w_fb_6',
        programId: 'prog_full_body_default',
        dayNumber: 6,
        name: 'Day 6 — Rest Day',
        isRestDay: true,
        exercises: []
      },
      {
        id: 'w_fb_7',
        programId: 'prog_full_body_default',
        dayNumber: 7,
        name: 'Day 7 — Rest Day',
        isRestDay: true,
        exercises: []
      }
    ]
  }
];
