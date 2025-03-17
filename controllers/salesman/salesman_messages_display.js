const messages = [
    { from: "salesman", to: "salesmanager", messages: "Submitted my sales report for this week." },
    { from: "salesman", to: "company", messages: "Requesting more product samples for clients." },
    { from: "salesman", to: "all", messages: "Reminder: Team huddle tomorrow at 9 AM." },
    { from: "salesman", to: "customer", messages: "Your order has been shipped. Expect delivery by Friday." },
    { from: "salesman", to: "admin", messages: "Need assistance with inventory access." },
    { from: "salesman", to: "salesmanager", messages: "Can we discuss my sales targets for next month?" }
];

async function salesman_messages_display(req, res) {
    try {
        res.render("salesman/messages_feature/messages_salesman", {
            messages,
            activePage: 'employee', // Adjust based on your navigation
            activeRoute: 'messages'
        });
    } catch (error) {
        console.error("Error rendering salesman messages:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function render_compose_message_form(req, res) {
    try {
        res.render("salesman/messages_feature/salesman_compose_messages", {
            activePage: 'employee',
            activeRoute: 'messages'
        });
    } catch (error) {
        console.error("Error rendering salesman compose form:", error);
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
            ...(to !== 'all' && { branch_id, branch_name }) // Add branch fields if "to" is not "all"
        };
        messages.push(newMessage);
        res.redirect("/salesman/messages");
    } catch (error) {
        console.error("Error composing salesman message:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { salesman_messages_display, render_compose_message_form, compose_message };