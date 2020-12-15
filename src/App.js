import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import shortid from 'shortid';
import Container from './components/Container/Container';
import Heading from './components/Heading';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';
import { saveToLS, getFromLS } from './utils/helpers';

class App extends Component {
    state = {
        contacts: [],
        filter: '',
    };

    addContact = (name, number) => {
        const checkedForName = this.state.contacts.find(
            contact => name === contact.name,
        );

        if (checkedForName) {
            return toast.error(`${name} is already in contacts`);
        }

        const newContact = {
            id: shortid.generate(),
            name,
            number,
        };

        if (!name || !number) {
            toast.error('Invalid name or number value !');
            return;
        }

        this.setState(({ contacts }) => ({
            contacts: [...contacts, newContact],
        }));
    };

    formSubmitHandler = ({ name, number }) => {
        this.addContact(name, number);
    };

    handleFilterChange = filter => {
        this.setState({ filter });
    };

    showContact = () => {
        const { contacts, filter } = this.state;
        const normalizedFilter = filter.toLowerCase();

        return contacts.filter(({ name }) =>
            name.toLowerCase().includes(normalizedFilter),
        );
    };

    removeContact = contactId => {
        this.setState(prevState => ({
            contacts: prevState.contacts.filter(({ id }) => id !== contactId),
        }));
    };

    componentDidMount() {
        const parsedContacts = getFromLS('contacts');

        if (parsedContacts) {
            this.setState({ contacts: parsedContacts });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { contacts } = this.state;

        if (contacts !== prevState.contacts) {
            saveToLS('contacts', contacts);
        }
    }

    render() {
        const { contacts, filter } = this.state;

        return (
            <Container>
                <Heading text="Phonebook" />
                <ContactForm onSubmit={this.formSubmitHandler} />
                <ToastContainer />
                <Heading text="Contacts" />
                {contacts.length >= 2 && (
                    <Filter
                        value={filter}
                        onFilterChange={this.handleFilterChange}
                    />
                )}
                {}
                <ContactList
                    contacts={this.showContact()}
                    onDeleteContact={this.removeContact}
                />
            </Container>
        );
    }
}

export default App;
