const messages = [
    { from: "salesmanager", to: "salesman", messages: "Ensure all sales reports are submitted by EOD." },
    { from: "salesmanager", to: "company", messages: "Requesting approval for the new sales strategy." },
    { from: "salesmanager", to: "all", messages: "Team meeting scheduled for Thursday at 10 AM." },
    { from: "salesmanager", to: "customer", messages: "Follow up on your recent inquiry with us." },
    { from: "salesmanager", to: "salesman", messages: "Training session for new CRM tool tomorrow." },
    { from: "salesmanager", to: "admin", messages: "Need updated inventory data for sales planning." }
];

async function salesmanager_messages_display(req, res) {
    try {
        res.render("salesmanager/messages_feature/messages_salesmanager", {
            messages,
            activePage: 'employee',
            activeRoute: 'messages'
        });
    } catch (error) {
        console.error("Error rendering sales manager messages:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function render_compose_message_form(req, res) {
    try {
        res.render("salesmanager/messages_feature/salesmanager_compose_messages", {
            activePage: 'employee',
            activeRoute: 'messages'
        });
    } catch (error) {
        console.error("Error rendering sales manager compose form:", error);
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
            ...(to !== 'all' && { branch_id, branch_name })
        };
        messages.push(newMessage);
        res.redirect("/salesmanager/messages");
    } catch (error) {
        console.error("Error composing sales manager message:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function view_message(req, res) {
    try {
        const { from, to, msg } = req.query; // Get query params
        res.render("salesmanager/messages_feature/view_message", {
            from,
            to,
            messages: msg,
            activePage: 'employee',
            activeRoute: 'messages'
        });
    } catch (error) {
        console.error("Error rendering message details:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { salesmanager_messages_display, render_compose_message_form, compose_message, view_message };