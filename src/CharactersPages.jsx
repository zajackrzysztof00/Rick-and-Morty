import { 
  useContext, 
  useEffect, 
  useState 
} from "react";
import {
  Table,
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Image,
  Pagination,
  Select,
  Segment,
  Header,
  Container
} from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { CharacterContext } from "./App";
import Fetcher from "./services/Fetcher";

const CharactersPages = () => {

  const fetcher = new Fetcher('https://rickandmortyapi.com/api');

  const navigate = useNavigate();
  const { setCharacterId } = useContext(CharacterContext);
  const [characters, setCharacters] = useState();
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState();
  const [status, setStatus] = useState();
  const statuses = [
    { key: "alive", value: "alive", text: "Alive" },
    { key: "dead", value: "dead", text: "Dead" },
    { key: "unknown", value: "unknown", text: "Unknown" },
    { key: "none", value: "", text: "None" },
  ];

  useEffect(() => {
    const fetchCharacterData = async() => {
      try {
        let data;
        if (status == undefined || status == 'none'){
          data = await fetcher.fetchData(`https://rickandmortyapi.com/api/character/?page=${page}`)
        } else {
          data = await fetcher.fetchData(`https://rickandmortyapi.com/api/character/?page=${page}&status=${status}`)
        }
        setCharacters(data);
        setMaxPage(data.info.pages);
      } catch (error) {
        console.error('Error fetching characters data:', error);
      }
    }
    fetchCharacterData();
  }, [page, status]);

  const handleCellClick = (id) => {
    setCharacterId(id);
    navigate(`/characterInfo`);
  };

  const changeStatus = (event, data) => {
    setStatus(data.value);
  };

  return (
    <Container style={{ padding: "2em" }}>
      <Segment raised>
        <Header as="h2" textAlign="center">
          Characters List
        </Header>

        {characters && (
          <Select
            placeholder="Filter by Status"
            options={statuses}
            onChange={changeStatus}
            style={{ marginBottom: "1em" }}
          />
        )}

        <Table celled striped selectable>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Species</TableHeaderCell>
              <TableHeaderCell>Gender</TableHeaderCell>
              <TableHeaderCell>Image</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {characters?.results.map((character) => (
              <TableRow
                key={character.id}
                onClick={() => handleCellClick(character.id)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{character.name}</TableCell>
                <TableCell>{character.status}</TableCell>
                <TableCell>{character.species}</TableCell>
                <TableCell>{character.gender}</TableCell>
                <TableCell>
                  <Image src={character.image} size="small" rounded />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {maxPage && (
          <Pagination
            defaultActivePage={1}
            totalPages={maxPage}
            onPageChange={(event, data) => setPage(data.activePage)}
            style={{ marginTop: "1em" }}
          />
        )}
      </Segment>
    </Container>
  );
};

export default CharactersPages;
