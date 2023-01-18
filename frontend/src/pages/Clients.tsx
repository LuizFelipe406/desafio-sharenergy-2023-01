import React, { useState, useEffect } from "react";
import { BsFillGearFill, BsFillXCircleFill } from "react-icons/bs";
import SideBar from "../components/SideBar";
import useLocalStorage from "../hooks/useLocalStorage";
import IClient from "../interfaces/IClient";
import requestApi from "../utils/requestApi";
import clientSchema from "../utils/clientSchema";
import { cpfMask, phoneMask } from "../utils/mask";

function Clients() {
  const [update, setUpdate] = useState({
    isUpdating: false,
    idToUpdate: "",
  });
  const [clients, setClients] = useState<IClient[]>([]);
  const [token] = useLocalStorage("token", "");
  const [clientForm, setClientForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    cpf: ''
  })
  const [isFormValid, setIsFormValid] = useState(false);

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

  useEffect(() => {
    const { error } = clientSchema.validate(clientForm);
    if (error) {
      setIsFormValid(false);
    } else {
      setIsFormValid(true);
    }
  }, [clientForm]);

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = target;
    let valueToInsert = '';
    switch (name) {
      case 'cpf': valueToInsert = cpfMask(value); break;
      case 'phone': valueToInsert = phoneMask(value); break;
      default: valueToInsert = value; break;
    }
    setClientForm((oldForm) => ({
      ...oldForm,
      [name]: valueToInsert,
    }))
  };

  const handleSubmitClick = async () => {
    const method = update.isUpdating ? "PATCH" : "POST";
    const endpoint = update.isUpdating
      ? `customer/${update.idToUpdate}`
      : "customer";
    const { status, data } = await requestApi(
      method,
      endpoint,
      { ...clientForm },
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
              ...clientForm
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
    setClientForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      cpf: ''
    })
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
      setClientForm(clientToUpdate);
    }
  };

  return (
    <div>
      <SideBar />
      <div className="w-screen h-screen flex items-center justify-around bg-gradient-to-tl from-dcream to-cream font-plexSans">
        <div className="grid grid-col-1 gap-y-4 h-3/5 w-1/5 ml-20 mt-5 overflow-y-scroll snap-mandatory scroll">
          {clients.map((client: IClient) => (
            <div key={client._id} className="flex flex h-fit justify-between snap-center">
              <div className="flex flex-col mr-5">
                <span className="text-dgreen font-bold text-xl">{`${client.name.toUpperCase()} - ${client.cpf}`}</span>
                <div className="font-medium text-gray-500">
                  <span className="mr-5">{client.email}</span>
                  <span>{client.phone}</span>
                </div>
                <span className="font-medium text-gray-500">{`Endereço: ${client.address}`}</span>
              </div>
              <div className="text-xl flex items-center justify-center w-fit mr-4">
                <button className="mr-2" id={client._id} type="button" onClick={HandleClickUpdate}>
                  {<BsFillGearFill />}
                </button>
                <button id={client._id} type="button" onClick={HandleClickDelete}>
                  { <BsFillXCircleFill />}
                </button>
              </div>
            </div>
          ))}
          { clients.length === 0 && <span className="font-medium text-gray-500 text-xl">Nenhum Cliente Cadastrado</span>}
        </div>
        <div className="flex bg-gradient-to-br from-green to-dgreen w-2/6 h-3/5 rounded-3xl items-center justify-center">
          <div className="w-4/5 flex flex-col items-center justify-center">
            <h2 className="text-dcream font-bold text-3xl self-start mb-6">
              {update.isUpdating ? "Atualizar" : "Cadastrar"}
            </h2>
            <input
              className="w-4/5 p-2 border-b-2 border-dcream focus:outline-none mb-6 bg-transparent text-dcream placeholder:text-dcream"
              placeholder="Nome"
              type="text"
              value={clientForm.name}
              name="name"
              onChange={handleChange}
            />
            <input
              className="w-4/5 p-2 border-b-2 border-dcream focus:outline-none mb-6 bg-transparent text-dcream placeholder:text-dcream focus:appearance-none hover:appearance-none"
              placeholder="CPF"
              type="text"
              value={clientForm.cpf}
              name="cpf"
              onChange={handleChange}
            />
            <input
              className="w-4/5 p-2 border-b-2 border-dcream focus:outline-none mb-6 bg-transparent text-dcream placeholder:text-dcream"
              placeholder="Email"
              type="text"
              value={clientForm.email}
              name="email"
              onChange={handleChange}
            />
            <input
              className="w-4/5 p-2 border-b-2 border-dcream focus:outline-none mb-6 bg-transparent text-dcream placeholder:text-dcream"
              placeholder="Celular"
              type="text"
              value={clientForm.phone}
              name="phone"
              onChange={handleChange}
            />
            <input
              className="w-4/5 p-2 border-b-2 border-dcream focus:outline-none mb-6 bg-transparent text-dcream placeholder:text-dcream"
              placeholder="Endereço"
              type="text"
              value={clientForm.address}
              name="address"
              onChange={handleChange}
            />
            <button
              className="mt-1 bg-golden rounded-[2em] py-3 px-7 font-bold cursor-pointer shadow-xl mb-10 disabled:bg-gray-400 transition duration-300"
              type="button"
              onClick={handleSubmitClick}
              disabled={!isFormValid}
            >
              salvar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Clients;
