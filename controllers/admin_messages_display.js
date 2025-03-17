const messages = [
    { from: "admin", to: "salesman", messages: "Please update your sales report..." },
    { from: "admin", to: "salesmanager", messages: "Review the team's performance..." },
    { from: "admin", to: "company", messages: "Reminder: The annual general meeting..." },
    { from: "admin", to: "customer", messages: "Thank you for your recent purchase..." },
    { from: "admin", to: "salesman", messages: "New product training session..." },
    { from: "admin", to: "salesmanager", messages: "Please submit the quarterly budget..." }
];

async function admin_messages_display(req, res) {
    try {
        res.render("owner/messages_feature/messages_admin", {
            messages,
            activePage: 'employee',
            activeRoute: 'messages'
        });
    } catch (error) {
        console.error("Error rendering messages:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function render_compose_message_form(req, res) {
    try {
        res.render("owner/messages_feature/admin_compose_messages", {
            activePage: 'employee',
            activeRoute: 'messages'
        });
    } catch (error) {
        console.error("Error rendering compose form:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function compose_message(req, res) {
    try {
        const { from, to, messages: messageContent, branch_id, branch_name } = req.body;
        const newMessage = { 
            from, 
            to, 
            messages: messageContent,
            ...(to !== 'admin' && { branch_id, branch_name }) // Add branch fields only if "to" is not "admin"
        };
        messages.push(newMessage); // Add the new message to the array
        res.redirect("/admin/messages"); // Redirect to the messages list
    } catch (error) {
        console.error("Error composing message:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { admin_messages_display, render_compose_message_form, compose_message };