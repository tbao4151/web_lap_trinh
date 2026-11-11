export type ProgrammingLanguage = 'c' | 'cpp' | 'python' | 'java';

export type AppRole = 'guest' | 'learner' | 'teacher' | 'admin';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'competition';

export type LearningGoal = 'zero-to-hero' | 'high-school' | 'competitive' | 'career-cs';

export type CourseVisibility = 'draft' | 'published' | 'archived';

export type LessonBlockType =
  | 'richText'
  | 'code'
  | 'callout'
  | 'image'
  | 'slide'
  | 'video'
  | 'quiz'
  | 'interactive'
  | 'problemReference'
  | 'teacherNote';

export type SubmissionStatus =
  | 'PENDING'
  | 'AC'
  | 'WA'
  | 'TLE'
  | 'MLE'
  | 'RE'
  | 'CE';

export type ProblemSolveState = 'unsolved' | 'attempted' | 'solved';

export interface Domain {
  id: string;
  slug: string;
  name: string;
  description: string;
  iconName: string;
  requiresCodeEditor: boolean;
}

export interface Concept {
  id: string;
  slug: string;
  title: string;
  domainId: string;
  summary: string;
}

export interface RichTextBlockData {
  heading?: string;
  paragraphs: string[];
  bulletPoints?: string[];
  formulaLatex?: string;
  formulaCaption?: string;
}

export interface CodeBlockData {
  title: string;
  defaultLanguage: ProgrammingLanguage;
  snippets: Partial<Record<ProgrammingLanguage, string>>;
  sampleInput?: string;
  expectedOutput?: string;
  complexityNote?: string;
}

export interface CalloutBlockData {
  variant: 'info' | 'warning' | 'mistake' | 'tip';
  title: string;
  content: string;
}

export interface ImageBlockData {
  caption: string;
  alt: string;
  diagramType: 'array-memory' | 'dp-dag' | 'binary-search' | 'git-graph';
}

export interface SlideItem {
  title: string;
  subtitle?: string;
  bullets: string[];
  highlightFormula?: string;
}

export interface SlideBlockData {
  deckTitle: string;
  slides: SlideItem[];
}

export interface VideoBlockData {
  title: string;
  durationLabel: string;
  summary: string;
  transcriptOutline: string[];
}

export interface QuizOption {
  id: string;
  text: string;
  explanation: string;
}

export interface QuizBlockData {
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  conceptTag: string;
}

export interface CoinChangePreset {
  id: string;
  label: string;
  coins: number[];
  target: number;
  note: string;
}

export interface InteractiveBlockData {
  widgetType: 'dp-coin-change';
  title: string;
  description: string;
  presets: CoinChangePreset[];
}

export interface ProblemReferenceBlockData {
  problemSlug: string;
  promptNote: string;
}

export interface TeacherNoteBlockData {
  pedagogyGoal: string;
  commonStudentQuestions: string[];
  classroomTimingNote: string;
}

export type LessonBlock =
  | { id: string; type: 'richText'; order: number; data: RichTextBlockData }
  | { id: string; type: 'code'; order: number; data: CodeBlockData }
  | { id: string; type: 'callout'; order: number; data: CalloutBlockData }
  | { id: string; type: 'image'; order: number; data: ImageBlockData }
  | { id: string; type: 'slide'; order: number; data: SlideBlockData }
  | { id: string; type: 'video'; order: number; data: VideoBlockData }
  | { id: string; type: 'quiz'; order: number; data: QuizBlockData }
  | { id: string; type: 'interactive'; order: number; data: InteractiveBlockData }
  | { id: string; type: 'problemReference'; order: number; data: ProblemReferenceBlockData }
  | { id: string; type: 'teacherNote'; order: number; data: TeacherNoteBlockData };

export interface LessonSummary {
  id: string;
  slug: string;
  title: string;
  order: number;
  estimatedMinutes: number;
  isPreview: boolean;
  primaryType: 'theory' | 'interactive' | 'practice' | 'quiz';
}

export interface LessonDetail extends LessonSummary {
  courseId: string;
  courseSlug: string;
  moduleId: string;
  objectives: string[];
  conceptIds: string[];
  relatedProblemSlugs: string[];
  blocks: LessonBlock[];
}

export interface CourseModule {
  id: string;
  title: string;
  description?: string;
  order: number;
  lessons: LessonSummary[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  domainId: string;
  level: Difficulty;
  goals: LearningGoal[];
  languages: ProgrammingLanguage[];
  tags: string[];
  priceVnd: number;
  visibility: CourseVisibility;
  estimatedHours: number;
  updatedAt: string;
  instructorName: string;
  instructorRole: string;
  instructorBio: string;
  prerequisites: string[];
  outcomes: string[];
  suitableFor: string[];
  bannerTone: 'indigo' | 'teal' | 'slate' | 'amber' | 'emerald' | 'violet';
  modules: CourseModule[];
}

export interface ProblemSample {
  input: string;
  output: string;
  explanation?: string;
}

export interface ProblemTestGroup {
  id: string;
  name: string;
  points: number;
  constraintsNote: string;
  testcaseCount: number;
}

export interface Problem {
  id: string;
  code: string;
  slug: string;
  title: string;
  domainId: string;
  difficulty: Difficulty;
  goals: LearningGoal[];
  tags: string[];
  supportedLanguages: ProgrammingLanguage[];
  timeLimitMs: number;
  memoryLimitMb: number;
  statement: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  samples: ProblemSample[];
  notes?: string;
  hints: string[];
  starterCode: Record<ProgrammingLanguage, string>;
  testGroups: ProblemTestGroup[];
  visibility: 'public' | 'classroom-only' | 'draft';
}

export interface SubmissionTestGroupResult {
  groupId: string;
  groupName: string;
  status: SubmissionStatus;
  passedCount: number;
  totalCount: number;
  score: number;
  maxScore: number;
  runtimeMs: number;
  memoryKb: number;
  sampleNote?: string;
}

export interface Submission {
  id: string;
  problemId: string;
  problemSlug: string;
  problemTitle: string;
  userId: string;
  userName: string;
  classroomId?: string;
  language: ProgrammingLanguage;
  status: SubmissionStatus;
  sourceCode: string;
  isDemo: boolean;
  submittedAt: string;
  runtimeMs?: number;
  memoryKb?: number;
  score: number;
  maxScore: number;
  compilerMessage?: string;
  testGroupResults: SubmissionTestGroupResult[];
}

export interface LearningPathNode {
  id: string;
  order: number;
  title: string;
  description: string;
  courseSlug: string;
  recommendedProblemSlugs: string[];
  milestoneSkill: string;
}

export interface LearningPath {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  goal: LearningGoal;
  estimatedWeeks: number;
  targetAudience: string;
  outcomes: string[];
  nodes: LearningPathNode[];
}

export interface LearnerNote {
  id: string;
  courseSlug: string;
  lessonSlug: string;
  lessonTitle: string;
  content: string;
  isBookmarked: boolean;
  updatedAt: string;
  tags: string[];
}

export interface SkillCompetency {
  id: string;
  skillName: string;
  domainId: string;
  language?: ProgrammingLanguage;
  level: Difficulty;
  status: 'mastered' | 'in-progress' | 'needs-review';
  completedLessonsCount: number;
  totalLessonsCount: number;
  solvedProblemsCount: number;
  totalProblemsCount: number;
  actionableGap: string;
  recommendedLessonSlug?: string;
  recommendedCourseSlug?: string;
  recommendedProblemSlug?: string;
}

export interface ClassStudent {
  id: string;
  name: string;
  studentCode: string;
  completedLessons: number;
  solvedProblems: number;
  lastActiveAt: string;
  assignmentStatus: 'submitted' | 'in-progress' | 'late';
}

export interface ClassAssignment {
  id: string;
  classroomId: string;
  title: string;
  dueAt: string;
  type: 'lesson' | 'problem-set';
  targetCourseSlug?: string;
  targetLessonSlug?: string;
  problemSlugs: string[];
  submittedCount: number;
  lateCount: number;
  totalStudents: number;
}

export interface Classroom {
  id: string;
  code: string;
  name: string;
  gradeOrCohort: string;
  teacherName: string;
  scheduleLabel: string;
  studentCount: number;
  activeAssignmentCount: number;
  averageCompletionPercent: number;
  students: ClassStudent[];
  assignments: ClassAssignment[];
}

export interface ContestEntry {
  rank: number;
  participantCode: string;
  displayName: string;
  schoolOrGroup: string;
  totalScore: number;
  penaltyMinutes: number;
  problemScores: Record<string, { score: number; status: SubmissionStatus }>;
}

export interface Contest {
  id: string;
  slug: string;
  title: string;
  description: string;
  status: 'upcoming' | 'ongoing' | 'past';
  startTime: string;
  durationMinutes: number;
  ruleFormat: 'IOI' | 'ICPC';
  targetGoal: LearningGoal;
  problemSlugs: string[];
  registeredCountDemo: number;
  leaderboard: ContestEntry[];
}

export interface ResearchNote {
  id: string;
  title: string;
  topicTag: string;
  updatedAt: string;
  summary: string;
  approaches: Array<{
    name: string;
    timeComplexity: string;
    spaceComplexity: string;
    suitability: string;
  }>;
  linkedCourseSlug?: string;
  linkedLessonId?: string;
  linkedProblemSlugs: string[];
  convertedToLessonDraft?: boolean;
}

export interface PlatformUser {
  id: string;
  displayName: string;
  emailDemo: string;
  roles: AppRole[];
  primaryGoal: LearningGoal;
  status: 'active' | 'invited' | 'suspended';
  joinedAt: string;
}

export interface OrderDemo {
  id: string;
  orderCode: string;
  userId: string;
  userName: string;
  courseSlug: string;
  courseTitle: string;
  amountVnd: number;
  status: 'demo-unlocked' | 'demo-pending' | 'demo-refunded';
  createdAt: string;
}

export interface DemoAppState {
  version: string;
  role: AppRole;
  activeGoal: LearningGoal;
  enrolledCourseSlugs: string[];
  completedLessonSlugs: string[];
  bookmarkedLessonSlugs: string[];
  quizAnswers: Record<string, string>;
  notes: LearnerNote[];
  codeDrafts: Record<string, string>;
  solvedProblemSlugs: string[];
  attemptedProblemSlugs: string[];
  courses: Course[];
  lessonsBySlug: Record<string, LessonDetail>;
  problems: Problem[];
  submissions: Submission[];
  classrooms: Classroom[];
  researchNotes: ResearchNote[];
  users: PlatformUser[];
  orders: OrderDemo[];
}
