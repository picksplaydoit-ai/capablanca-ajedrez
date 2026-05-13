/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Training from './pages/Training';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import GameAnalysis from './pages/GameAnalysis';
import StrategicProfile from './pages/StrategicProfile';
import Onboarding from './pages/Onboarding';
import Academy from './pages/Academy';
import Journal from './pages/Journal';
import GMStudy from './pages/GMStudy';
import { Toaster } from '@/components/ui/sonner';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/training" element={<Training />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analysis" element={<GameAnalysis />} />
        <Route path="/profile" element={<StrategicProfile />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/gm-study" element={<GMStudy />} />
      </Routes>
      <Toaster theme="dark" position="top-center" />
    </Router>
  );
}


