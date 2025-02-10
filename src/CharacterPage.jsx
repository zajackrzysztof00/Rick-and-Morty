import { 
  useContext, 
  useEffect, 
  useState } from "react";
import {
  Table,
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Card,
  CardContent,
  CardMeta,
  CardHeader,
  Image,
  Grid,
  Header,
  Container,
  Divider,
  Segment
} from "semantic-ui-react";
import { CharacterContext } from "./App";
import { GetCharacterInfo,
  GetEpisodesInfo, 
  GetLocationInfo, 
  GetOriginInfo 
} from "./services/charactersService";
import { Fetcher } from "./services/Fetcher";

const CharacterPage = () => {

    const fetcher = new Fetcher('https://rickandmortyapi.com/api');

  const [characterData, setCharacterData] = useState();
  const [locationData, setLocationData] = useState();
  const [originData, setOriginData] = useState();
  const { characterId } = useContext(CharacterContext);
  const [episodesData, setEpisodesData] = useState([]);

  useEffect(() => {
    if (!characterId) return;
    fetcher.fetchData(`https://rickandmortyapi.com/api/character/${id}`)
    .then((data) => {
      setCharacterData(data);
      if (data.origin.url) {
        fetcher.fetchData(data.origin.url)
        .then(setOriginData);
      }
      if (data.location.url) {
        fetcher.fetchData(data.location.url)
        .then(setLocationData);
      }
      fetcher.fetchData(data.episode)
      .then(setEpisodesData);
    });
  }, [characterId]);

  return (
    <Container style={{ padding: "2em" }}>
      {characterData ? (
        <Segment raised>
          <Grid stackable columns={2}>
            <Grid.Column width={6}>
              <Card fluid>
                <Image src={characterData.image} wrapped ui={false} />
                <CardContent>
                  <CardHeader>{characterData.name}</CardHeader>
                  <CardMeta>
                    <p>Status: {characterData.status}</p>
                    <p>Species: {characterData.species}</p>
                    {characterData.type && <p>Type: {characterData.type}</p>}
                    <p>Gender: {characterData.gender}</p>
                  </CardMeta>
                </CardContent>
              </Card>
            </Grid.Column>

            <Grid.Column width={10}>
              {originData && (
                <Segment color="teal">
                  <Header as="h3">Origin: {originData.name}</Header>
                  <p>Type: {originData.type}</p>
                  <p>Dimension: {originData.dimension}</p>
                </Segment>
              )}
              {locationData && (
                <Segment color="blue">
                  <Header as="h3">Location: {locationData.name}</Header>
                  <p>Type: {locationData.type}</p>
                  <p>Dimension: {locationData.dimension}</p>
                </Segment>
              )}
            </Grid.Column>
          </Grid>

          <Divider horizontal>Episodes</Divider>

          <Table celled striped>
            <TableHeader>
              <TableRow>
                <TableHeaderCell>Episode</TableHeaderCell>
                <TableHeaderCell>Name</TableHeaderCell>
                <TableHeaderCell>Air Date</TableHeaderCell>
                <TableHeaderCell>Created</TableHeaderCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {episodesData.map((episode, index) => (
                <TableRow key={index}>
                  <TableCell>{episode.episode}</TableCell>
                  <TableCell>{episode.name}</TableCell>
                  <TableCell>{episode.air_date}</TableCell>
                  <TableCell>{new Date(episode.created).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Segment secondary>
            <p>Character created on: {new Date(characterData.created).toLocaleDateString()}</p>
          </Segment>
        </Segment>
      ) : (
        <Header as="h3" textAlign="center">
          No character selected or data loading...
        </Header>
      )}
    </Container>
  );
};

export default CharacterPage;
