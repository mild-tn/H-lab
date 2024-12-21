import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";

export const MyComponent = () => {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const db = getDatabase();
    const dbRef = ref(db, "some/path");

    onValue(dbRef, (snapshot) => {
      setData(snapshot.val());
    });
  }, []);

  if (data === null) {
    return <div>Loading...</div>;
  }

  return <div>{data}</div>;
};
