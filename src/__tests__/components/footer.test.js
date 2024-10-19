import React from 'react';
import { render } from '@testing-library/react-native';
import Footer from '../../components/footer'; 
describe('Footer Component', () => {
  it('renders footer container correctly', () => {
    const { getByTestId } = render(<Footer />);
    
    // Test if footer container is rendered
    const footerContainer = getByTestId('footer-container');
    expect(footerContainer).toBeTruthy();
  });

  it('renders all icons correctly', () => {
    const { getByTestId } = render(<Footer />);

    // Test if each icon is rendered
    const homeIcon = getByTestId('icon-home');
    const historyIcon = getByTestId('icon-history');
    const contactIcon = getByTestId('icon-contact');
    const profileIcon = getByTestId('icon-profile');
    
    expect(homeIcon).toBeTruthy();
    expect(historyIcon).toBeTruthy();
    expect(contactIcon).toBeTruthy();
    expect(profileIcon).toBeTruthy();
  });
});