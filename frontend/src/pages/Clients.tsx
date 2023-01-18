import React, { useState, useEffect } from "react";
import SideBar from "../components/SideBar";
import useLocalStorage from "../hooks/useLocalStorage";
import IClient from "../interfaces/IClient";
import requestApi from "../utils/requestApi";

function Clients() {
  const [update, setUpdate] = useState({
    isUpdating: false,
    idToUpdate: "",
  });
  const [clients, setClients] = useState<IClient[]>([]);
  const [token] = useLocalStorage("token", "");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [cpf, setCpf] = useState("");

  useEffect(() => {
    const request = async () => {
      const { status, data } = await requestApi(
        "GET",
        "customer",
        {},
        { authorization: token }
      );
      if (status === 200) setClients(data);
    };
    request();
  }, []);

  const handleNameChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setName(value);
  };

  const handleEmailChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setEmail(value);
  };

  const handlePhoneChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setPhone(value);
  };

  const handleAddressChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setAddress(value);
  };

  const handleCpfChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setCpf(value);
  };

  const handleSubmitClick = async () => {
    const method = update.isUpdating ? "PATCH" : "POST";
    const endpoint = update.isUpdating
      ? `customer/${update.idToUpdate}`
      : "customer";
    const { status, data } = await requestApi(
      method,
      endpoint,
      { name, email, phone, address, cpf },
      { authorization: token }
    );
    if (status === 201) {
      setClients((oldClients) => [...oldClients, data]);
    }
    if (status === 200) {
      setClients((oldClients) =>
        oldClients.map((client) => {
          if (client._id === update.idToUpdate) {
            return {
              _id: client._id,
              name,
              email,
              address,
              phone,
              cpf,
            };
          }
          return client;
        })
      );
      setUpdate({
        isUpdating: false,
        idToUpdate: "",
      });
    }
    setName("");
    setEmail("");
    setAddress("");
    setPhone("");
    setCpf("");
  };

  const HandleClickDelete = async ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { id } = currentTarget;
    const { status } = await requestApi(
      "DELETE",
      `customer/${id}`,
      {},
      { authorization: token }
    );
    if (status === 200) {
      setClients((oldClients) =>
        oldClients.filter((client) => client._id !== id)
      );
    }
  };

  const HandleClickUpdate = async ({
    currentTarget,
  }: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const { id } = currentTarget;
    setUpdate({
      idToUpdate: id,
      isUpdating: true,
    });
    const clientToUpdate = clients.find((client) => client._id === id);
    if (clientToUpdate) {
      setName(clientToUpdate.name);
      setEmail(clientToUpdate.email);
      setAddress(clientToUpdate.address);
      setPhone(clientToUpdate.phone);
      setCpf(clientToUpdate.cpf);
    }
  };

  return (
    <div>
      <SideBar />
      <div className="w-screen h-screen flex items-center justify-center bg-cream">
        <div>
          {clients.map((client: IClient) => (
            <div key={client._id}>
              <span>{client.name}</span>
              <span>{client.email}</span>
              <span>{client.phone}</span>
              <span>{client.address}</span>
              <span>{client.cpf}</span>
              <button id={client._id} type="button" onClick={HandleClickUpdate}>
                Atualizar
              </button>
              <button id={client._id} type="button" onClick={HandleClickDelete}>
                X
              </button>
            </div>
          ))}
        </div>
        <div>
          <input
            placeholder="Nome"
            type="text"
            value={name}
            onChange={handleNameChange}
          />
          <input
            placeholder="CPF"
            type="text"
            value={cpf}
            onChange={handleCpfChange}
          />
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            placeholder="Celular"
            type="text"
            value={phone}
            onChange={handlePhoneChange}
          />
          <input
            placeholder="Endereço"
            type="text"
            value={address}
            onChange={handleAddressChange}
          />
          <button type="button" onClick={handleSubmitClick}>
            {update.isUpdating ? "Atualizar" : "Cadastrar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Clients;
