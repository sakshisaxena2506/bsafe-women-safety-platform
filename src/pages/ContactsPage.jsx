import { useMemo, useState } from "react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import EmptyState from "../components/common/EmptyState";
import Modal from "../components/common/Modal";
import SearchBar from "../components/common/SearchBar";
import ContactCard from "../components/contacts/ContactCard";
import ContactForm from "../components/contacts/ContactForm";
import { useSafety } from "../context/SafetyContext";

export default function ContactsPage() {
  const { contacts, addContact, updateContact, deleteContact } = useSafety();
  const [query, setQuery] = useState("");
  const [editingContact, setEditingContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredContacts = useMemo(
    () => contacts.filter((contact) => `${contact.name} ${contact.relationship} ${contact.phone}`.toLowerCase().includes(query.toLowerCase())),
    [contacts, query]
  );

  function handleSubmit(values) {
    if (editingContact) {
      updateContact(editingContact.id, values);
    } else {
      addContact(values);
    }

    setEditingContact(null);
    setIsModalOpen(false);
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase text-brand-700 dark:text-brand-100">Emergency contacts</p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-950 dark:text-white">Trusted people to notify first</h1>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>Add contact</Button>
        </div>
        <div className="mt-5">
          <SearchBar value={query} onChange={setQuery} placeholder="Search contacts, relationship, or phone" />
        </div>
      </Card>

      {filteredContacts.length === 0 ? (
        <EmptyState title="No contacts found" message="Try changing your search or add a new trusted contact." actionLabel="Add contact" onAction={() => setIsModalOpen(true)} />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filteredContacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onEdit={(nextContact) => {
                setEditingContact(nextContact);
                setIsModalOpen(true);
              }}
              onDelete={deleteContact}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        title={editingContact ? "Edit contact" : "Add emergency contact"}
        onClose={() => {
          setEditingContact(null);
          setIsModalOpen(false);
        }}
      >
        <ContactForm
          contact={editingContact}
          onSubmit={handleSubmit}
          onCancel={() => {
            setEditingContact(null);
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </div>
  );
}
