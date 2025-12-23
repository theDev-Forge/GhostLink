export const Colors = {
  background: '#000000',
  surface: '#1C1C1C',
  surfaceHighlight: '#2C2C2C',
  primary: '#FF9900', // Premium Orange
  text: '#FFFFFF',
  textSecondary: '#B0B0B0',
  border: '#333333',
  success: '#46D369',
  error: '#FF4444',

  // Specific UI colors
  tabBar: '#121212',
  heroOverlay: 'rgba(0,0,0,0.6)',
};

export const Spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
};

export const Typography = {
  h1: { fontSize: 24, fontWeight: 'bold' as 'bold', color: Colors.text },
  h2: { fontSize: 20, fontWeight: '600' as '600', color: Colors.text },
  h3: { fontSize: 18, fontWeight: '600' as '600', color: Colors.text },
  body: { fontSize: 16, color: Colors.text },
  caption: { fontSize: 14, color: Colors.textSecondary },
};
