import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import { Home } from './pages/Home';
import { LoginPage } from './pages/Login';
import { NewSale } from './pages/NewSale';
import Sales from './pages/Sales';
import Schedule from './pages/Schedule';
import Client from './pages/Clients';
import { Reports } from './pages/Reports';
import { Segments } from './pages/Segments';
// import { ScheduleClient } from './pages/scheduleClient';
import ClientHistory from './pages/ClientHistory';
import { CreateHistory } from './pages/CreateHistory';
import { randomId } from './utils/random';
import { CreateSchedule } from './pages/CreateSchedule';
import { CreateClient } from './pages/CreateClient';
// import { scheduleClientService } from './services/scheduleClientService';
import store from './app/store';
import { Provider } from 'react-redux';

import { EditClient } from './pages/EditClient';
import { EditScheduleForm } from './pages/EditScheduleForm';

export function App() {
  // const [scheduleClients, setScheduleClients] = useState([]);

  useEffect(() => {
    document.body.style.backgroundColor = '#f8f8ff';

    // getScheduleClient();
  }, []);

  // setTimeout(() => {
  //     getScheduleClient();
  // }, (180 * 1000))

  // async function getScheduleClient() {
  //     const userId = await authService.getUserIdInLocalStorange();
  //     const findSchedules = await scheduleClientService.getClientsSchedule(userId);
  //     setScheduleClients(findSchedules);
  // }

  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          {/* <NavBar scheduleClients={scheduleClients.length} /> */}
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<Home />} />
            {/* <Route exact path='/schedule-client' element={<ScheduleClient />} /> */}
            <Route path="/client" element={<Client />} key={randomId()} />
            <Route
              path="/create-client"
              element={<CreateClient />}
              key={randomId()}
            />
            <Route
              path="/editClient/:clientId"
              element={<EditClient />}
              key={randomId()}
              // children={<EditClient />}
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
