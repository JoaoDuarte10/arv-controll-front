import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './app/store';
import { randomId } from './utils/random';

import { Clients } from './pages/Clients';
import { ClientHistory } from './pages/ClientHistory';
import { CreateHistory } from './pages/CreateHistory';
import { CreateSchedule } from './pages/CreateSchedule';
import { CreateClient } from './pages/CreateClient';
import { EditClient } from './pages/EditClient';
import { EditScheduleForm } from './pages/EditScheduleForm';
import { Home } from './pages/Home';
import { LoginPage } from './pages/Login';
import { NavBar } from './components/NavBar';
import { NewSale } from './pages/NewSale';
import { Reports } from './pages/Reports';
import { Sales } from './pages/Sales';
import { Schedule } from './pages/Schedule';
import { Segments } from './pages/Segments';

export function App() {
  useEffect(() => {
    document.body.style.backgroundColor = '#f8f8ff';
  }, []);

  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/client" element={<Clients />} key={randomId()} />
            <Route
              path="/create-client"
              element={<CreateClient />}
              key={randomId()}
            />
            <Route
              path="/editClient/:clientId"
              element={<EditClient />}
              key={randomId()}
            />
            <Route
              path="/new-sale"
              element={<NewSale key={randomId()} />}
              key={randomId()}
            />
            <Route path="/schedule" element={<Schedule />} key={randomId()} />
            <Route
              path="/create-schedule"
              element={<CreateSchedule />}
              key={randomId()}
            />
            <Route
              path="/edit-schedule/:scheduleId"
              element={<EditScheduleForm />}
              key={randomId()}
            />
            <Route path="/sales" element={<Sales />} key={randomId()} />
            <Route path="/reports" element={<Reports />} key={randomId()} />
            <Route
              path="/segments-clients"
              element={<Segments />}
              key={randomId()}
            />
            <Route path="/history" element={<ClientHistory />} />
            <Route
              path="/create-history"
              element={<CreateHistory />}
              key={randomId()}
            />
            <Route path="*" element={<Home />} key={randomId()} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}
