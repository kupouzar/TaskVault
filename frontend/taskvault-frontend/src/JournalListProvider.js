import { useEffect, useState } from "react";
import { JournalListContext } from "./JournalListContext.js";

function JournalListProvider({ children }) {
  const [journalLoadObject, setJournalLoadObject] = useState({
    state: "ready",
    error: null,
    data: null,
  });

  useEffect(() => {
    handleLoad();
  }, []);

  async function handleLoad() {
    setJournalLoadObject((current) => ({ ...current, state: "pending" }));
    const response = await fetch(`http://localhost:8080/journal/list`, {
      method: "GET",
    });
    const responseJson = await response.json();
    if (response.status < 400) {
      setJournalLoadObject({ state: "ready", data: responseJson });
      return responseJson;
    } else {
      setJournalLoadObject((current) => ({
        state: "error",
        data: current.data,
        error: responseJson.error,
      }));
      throw new Error(JSON.stringify(responseJson, null, 2));
    }
  }

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

  const value = {
    state: journalLoadObject.state,
    journalList: journalLoadObject.data || [],
    handlerMap: { handleCreate },
  };

  return (
    <JournalListContext.Provider value={value}>
      {children}
    </JournalListContext.Provider>
  );

}

export default JournalListProvider;