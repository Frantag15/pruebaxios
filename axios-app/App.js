import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Image, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';

export default function App() {
  const [movieId, setMovieId] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMovie = async () => {
    setLoading(true);
    setMovieData(null);
    setError(null);

    try {
      const response = await axios.get(`https://www.omdbapi.com/?i=${movieId}&apikey=tt0317219`);
      
      // Simula espera de 3 segundos
      setTimeout(() => {
        if (response.data.Response === 'True') {
          setMovieData(response.data);
        } else {
          setError('Película no encontrada.');
        }
        setLoading(false);
      }, 3000);

    } catch (err) {
      setError('Error al buscar la película.');
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Buscar película por IMDb ID</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: tt0317219"
        value={movieId}
        onChangeText={setMovieId}
      />
      <Button title="Buscar" onPress={fetchMovie} />
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {movieData && (
        <View style={styles.result}>
          <Text style={styles.movieTitle}>{movieData.Title}</Text>
          <Image source={{ uri: movieData.Poster }} style={styles.poster} />

          <Text style={styles.label}>Actors:</Text>
          <Text style={styles.info}>{movieData.Actors}</Text>

          <Text style={styles.label}>Director:</Text>
          <Text style={styles.info}>{movieData.Director}</Text>

          <Text style={styles.label}>Genre:</Text>
          <Text style={styles.info}>{movieData.Genre}</Text>

          <Text style={styles.label}>Ratings:</Text>
          {movieData.Ratings.map((rating, index) => (
            <Text key={index} style={styles.rating}>
              {rating.Source}: {rating.Value}
            </Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  loader: {
    marginVertical: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
    fontWeight: 'bold'
  },
  result: {
    marginTop: 20,
  },
  movieTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  poster: {
    width: '100%',
    height: 450,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  info: {
    marginBottom: 5,
  },
  rating: {
    fontStyle: 'italic',
  }
});
