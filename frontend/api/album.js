// api/album.js
import express from 'express';
import fetch from 'node-fetch';

export default async function handler(req, res) {
  const albumId = req.query.id;
  const response = await fetch(`https://api.deezer.com/album/${albumId}`);
  const data = await response.json();
  res.status(200).json(data);
}
