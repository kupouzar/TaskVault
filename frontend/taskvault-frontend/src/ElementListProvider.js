import { useContext, useEffect, useState } from "react";
import { ElementListContext } from "./ElementListContext.js";
import { useParams } from "react-router-dom";

function ElementListProvider({ children }) {
  const [elementLoadObject, setElementLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  const { id } = useParams();

  useEffect(() => {
    handleLoadElements();
  }, []);

  async function handleLoadElements() {
    setElementLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8080/element/list?parentJournalID=${id}`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      setElementLoadObject({ state: "ready", data: responseJson });
      console.log(responseJson);
      return responseJson;
    } else {
      setElementLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  async function handleGetElement(journalID, elementID) {
    setElementLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8080/element/get?pid=${journalID}&eid=${elementID}`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      setElementLoadObject({ state: "ready", data: responseJson });
      console.log(responseJson);
      return responseJson;
    } else {
      setElementLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

  /*
  async function handleCreate(dtoIn) {
    setJournalLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8080/journal/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dtoIn),
    });
    const responseJson = await response.json();

    if (response.status < 400) {
      setJournalLoadObject((current) => {
        current.data.push(responseJson);
        current.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        return { state: "ready", data: current.data };
      });
      return responseJson;
    } else {
      setJournalLoadObject((current) => {
        return { state: "error", data: current.data, error: responseJson };
      });
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }
  */

  const value = {
    state: elementLoadObject.state,
    elementList: elementLoadObject.data || [],
    handlerMap: { handleGetElement }
  };

  return (
    <ElementListContext.Provider value={value}>
      {children}
    </ElementListContext.Provider>
  );

}

export default ElementListProvider;