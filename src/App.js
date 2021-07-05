import './App.css';
import React, { useCallback } from 'react';
import { Button, Input, Alert } from "@chakra-ui/react"

function App() {
  const [cepInput, setCepInput] = React.useState('')

  const [uf, setUf] = React.useState('')
  const [location, setLocation] = React.useState()
  const [listCities, setListCities] = React.useState([])

  const getCep = React.useCallback ( async () =>{
    const url = `http://viacep.com.br/ws/${cepInput}/json/`
    const promise = await fetch(url)
    const data = await promise.json()
    setLocation(data.localidade)
    setUf(data.uf)
  }, [setUf, setLocation, cepInput],)
  function createCard() {
    if (location) {
      let newListCities = [...listCities];
      newListCities.push(location);
      setListCities(newListCities);
    }
  }

  React.useEffect(() => {
    if (cepInput.length === 8) {
      getCep()
    } else setLocation('')
  }, [cepInput])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Lista de cidades</h1>
      </header>
      <div className="Body">
        <Input color='white' placeholder="Seu CEP..." onChange={(event) => setCepInput(event.target.value)} />
        <Button colorScheme="blue" style={{ marginTop: 20 }} onClick={createCard}>Salvar</Button>
      </div>
      <div id='result'>
        {location && location + ' - ' + uf}
      </div>
      <div>
        {listCities && listCities.map((city, i) => {
          return <Alert status="success" key={i}>{i + 1 + ' - ' + city}</Alert>;
        })}
      </div>
    </div>
  );
}

export default App;
