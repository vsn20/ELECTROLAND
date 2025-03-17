const messages = [
    { from: "company", to: "salesman", messages: "Please submit your weekly sales figures by Friday." },
    { from: "company", to: "salesmanager", messages: "Review the sales team performance for Q1." },
    { from: "company", to: "all", messages: "Annual company meeting scheduled for April 1, 2025." },
    { from: "company", to: "customer", messages: "Thank you for choosing us! Enjoy our latest offers." },
    { from: "company", to: "salesman", messages: "New product line training next Wednesday." },
    { from: "company", to: "admin", messages: "Please update the inventory system with new stock." }
];

async function company_messages_display(req, res) {
    try {
        res.render("company/messages_feature/messages_company", {
            messages,
            activePage: 'employee',
            activePage: 'company', // Adjust based on your navigation
            activeRoute: 'messages'
        });
    } catch (error) {
        console.error("Error rendering company messages:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function render_compose_message_form(req, res) {
    try {
        res.render("company/messages_feature/company_compose_messages", {
            activePage: 'company',
            activeRoute: 'messages'
        });
    } catch (error) {
        console.error("Error rendering company compose form:", error);
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
        res.redirect("/company/messages");
    } catch (error) {
        console.error("Error composing company message:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function view_message(req, res) {
    try {
        const { from, to, msg } = req.query; // Get query params
        res.render("company/messages_feature/views_messages", {
            from,
            to,
            messages: msg,
            activePage: 'company',
            activeRoute: 'messages'
        });
    } catch (error) {
        console.error("Error rendering message details:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { company_messages_display, render_compose_message_form, compose_message, view_message };