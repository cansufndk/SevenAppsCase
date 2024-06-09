import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCharacters } from "@/app/api/ApiServices";
import {
  fetchCharactersSuccess,
  toggleCharacterSelection,
  removeSelectedCharacter,
} from "../../redux/actions/Action";
import { Character } from "@/app/Type/Types";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const characters = useSelector((state: any) => state.characters.characters);
  const selectedCharacters = useSelector(
    (state: any) => state.characters.selectedCharacters || []
  );
  const [selectedCharacterList, setSelectedCharacterList] = useState<
    Character[]
  >([]);
  const [query, setQuery] = useState("");
  const [originalCharacters, setOriginalCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const fetchInitialCharacters = async () => {
      try {
        const charactersData = await fetchCharacters("");
        setOriginalCharacters(charactersData);
        dispatch(fetchCharactersSuccess(charactersData));
      } catch (error) {
        console.error("Failed to fetch characters", error);
      }
    };

    fetchInitialCharacters();
  }, [dispatch]);

  useEffect(() => {
    setSelectedCharacterList(selectedCharacters);
  }, [selectedCharacters]);

  const handleInputChange = (text: string) => {
    setQuery(text);
    filterCharacters(text);
  };

  const filterCharacters = (text: string) => {
    if (text.length > 0) {
      const filteredCharacters = originalCharacters.filter((character: Character) => {
        return character.name.toLowerCase().includes(text.toLowerCase());
      });
      dispatch(fetchCharactersSuccess(filteredCharacters));
    } else {
      dispatch(fetchCharactersSuccess(originalCharacters));
    }
  };

  const handleSelectCharacter = (character: Character) => {
    if (isCharacterSelected(character)) {
      dispatch(removeSelectedCharacter(character.id));
    } else {
      dispatch(toggleCharacterSelection(character));
    }
  };

  const handleRemoveCharacter = (characterId: number) => {
    dispatch(removeSelectedCharacter(characterId));
  };

  const isCharacterSelected = (character: Character) => {
    return selectedCharacters.some(
      (item: Character) => item.id === character.id
    );
  };

  const getHighlightedText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <Text>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <Text key={index} style={{ fontWeight: 'bold' }}>{part}</Text>
          ) : (
            part
          )
        )}
      </Text>
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
          marginBottom: 10,
        }}
        onChangeText={handleInputChange}
        value={query}
        placeholder="Search for characters..."
      />
      {selectedCharacterList.length > 0 && (
        <View
          style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 10 }}
        >
          {selectedCharacterList.map((character: Character) => (
            <TouchableOpacity
              key={character.id}
              onPress={() => handleRemoveCharacter(character.id)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  backgroundColor: "#e0e0e0",
                  borderRadius: 20,
                  marginRight: 5,
                  marginBottom: 5,
                }}
              >
                <Text>{character.name}</Text>
                <AntDesign
                  name="closesquare"
                  size={16}
                  color="black"
                  style={{ marginLeft: 5 }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View style={{  marginTop: 20, borderWidth:1, borderRadius: 10 }}>
        <ScrollView>
          {characters.map((character: Character) => (
            <View
              key={character.id}
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 10,
                padding: 10,
                borderBottomWidth: 1
              }}
            >
              <TouchableOpacity onPress={() => handleSelectCharacter(character)}>
                {isCharacterSelected(character) ? (
                  <Ionicons name="checkbox" size={24} color="black" />
                ) : (
                  <MaterialIcons
                    name="check-box-outline-blank"
                    size={24}
                    color="black"
                  />
                )}
              </TouchableOpacity>
              <Image
                source={{ uri: character.image }}
                style={{ width: 50, height: 50, marginHorizontal: 10 }}
              />
              <View style={{ flex: 1 }}>
                {getHighlightedText(character.name, query)}
                <Text>{character.episode.length} episodes</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default HomeScreen;
