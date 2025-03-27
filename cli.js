const username = process.argv.slice(2);

const baseURL = `https://api.github.com/users/${username}/events`

function getUserEvents() {
    fetch(baseURL)
        .then(response => response.json())
        .then(data => {
            showUserEvents(data);
        })
        .catch(err => console.log(err));
}

function showUserEvents(data) {
    data.forEach(userEvent => {
        switch (userEvent.type) {
            case "CreateEvent":
                showCreateEvent(userEvent);
                break;
            case "DeleteEvent":
                showDeleteEvent(userEvent);
                break;
            case "PublicEvent":
                showPublicEvent(userEvent);
                break;
            case "PushEvent":
                showPushEvent(userEvent);
                break;
            default:
                console.log("Evento Desconhecido");
                break;
        }
    });
}

function showCreateEvent(userEvent) {
    console.log(`Created ${userEvent.payload.ref_type} on ${userEvent.repo.name}`);
}

function showDeleteEvent(userEvent) {
    console.log(`Deleted ${userEvent.payload.ref_type} on ${userEvent.repo.name}`);
}

function showPublicEvent(userEvent) {
    console.log(`Made ${userEvent.repo.name} Public`);
}

function showPushEvent(userEvent) {
    console.log(`Pushed ${userEvent.payload.size} commit(s) to ${userEvent.repo.name}`);
}

getUserEvents();
