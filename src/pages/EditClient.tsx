import { CircularIndeterminate } from '../components/LoaderCircular';
import { FormClients } from '../components/FormClients';
import { AlertError } from '../components/alerts/AlertError';
import { ComeBack } from '../components/ComeBack';

import { useGetClientsQuery, useUpdateClientMutation } from '../api/ApiSlice';
import { Client } from '../api/types/Client';

import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export function EditClient() {
  const navigate = useNavigate();
  const { clientId } = useParams();

  const { data: clients = [], isLoading: isLoadingGetClients } =
    useGetClientsQuery();

  const editClient = clients.find((client: Client) => client.id === clientId);

  const [
    updateClient,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdateClientMutation();

  if (!editClient) {
    navigate(-1);
  }

  const [name, setName] = useState(editClient ? editClient.name : '');
  const [email, setEmail] = useState(editClient ? editClient.email : '');
  const [phone, setPhone] = useState(editClient ? editClient.phone : '');
  const [segmentSelect, setSegmentSelect] = useState(
    editClient ? editClient.segment : null,
  );
  const [alert, setAlert] = useState<JSX.Element>(<div></div>);

  const clearStates = () => {
    setName('');
    setEmail('');
    setPhone('');
    setSegmentSelect(null);
  };

  const onUpdateClient = async (event: React.BaseSyntheticEvent) => {
    event.preventDefault();

    const emailField = email ? email.trim() : null;

    try {
      await updateClient({
        id: editClient.id,
        name: name.trim(),
        email: emailField,
        phone: phone.trim(),
        segment: segmentSelect,
      }).unwrap();
      clearStates();
      setTimeout(() => navigate(-1), 1000);
    } catch (err) {
      setAlert(<AlertError title="Não foi possivel editar o cliente" />);
    }
  };

  let loader;
  if (isLoadingUpdate || isLoadingGetClients) {
    loader = <CircularIndeterminate />;
  } else if (isSuccessUpdate) {
    loader = null;
  }

  if (alert) {
    setTimeout(() => setAlert(<div></div>), 5000);
  }

  return (
    <section className="container-main">
      {loader}

      <ComeBack />

      <FormClients
        edit={true}
        clearStates={clearStates}
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        phone={phone}
        setPhone={setPhone}
        setSegmentSelect={setSegmentSelect}
        segmentSelect={segmentSelect}
        onChangeClient={onUpdateClient}
        alert={alert}
      />
    </section>
  );
}
