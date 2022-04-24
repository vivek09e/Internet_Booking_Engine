import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom'

import Footer from './Footer';

describe('Footer', () =>
{
    test('Render Footer successfully', ()=>{
        render(<Footer />)
    })
    test('Checking Elemnts',()=>{
        render(<Footer />)
        var FooterElement = screen.getByText("Terms and Conditions")
        expect(FooterElement).toBeInTheDocument()
        
        FooterElement = screen.getByText("Support")
        expect(FooterElement).toBeInTheDocument()
    })
})