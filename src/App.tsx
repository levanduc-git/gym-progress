import React from 'react';
import { useApp } from './context/AppContext';
import { MobileContainer } from './components/layout/MobileContainer';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { ToastContainer } from './components/common/ToastContainer';
import { OnboardingWizard } from './components/onboarding/OnboardingWizard';
import { Dashboard } from './components/dashboard/Dashboard';
import { ProgramsView } from './components/programs/ProgramsView';
import { WorkoutSession } from './components/workout/WorkoutSession';
import { ProgressView } from './components/progress/ProgressView';
import { MoreView } from './components/more/MoreView';

export const AppContent: React.FC = () => {
  const { isOnboarded, activeTab } = useApp();

  // If first time opening app and hasn't finished onboarding
  if (!isOnboarded) {
    return <OnboardingWizard />;
  }

  return (
    <MobileContainer>
      <Header />

      {/* Main Tab Routing */}
      <main className="flex-1 overflow-x-hidden">
        {activeTab === 'home' && <Dashboard />}
        {activeTab === 'programs' && <ProgramsView />}
        {activeTab === 'workout' && <WorkoutSession />}
        {activeTab === 'progress' && <ProgressView />}
        {activeTab === 'more' && <MoreView />}
      </main>

      <BottomNav />
      <ToastContainer />
    </MobileContainer>
  );
};

export default function App() {
  return <AppContent />;
}
