class SenderController {
  async store(req, res) {
    const { name, email } = req.body;

    return res.json({
      name,
      email,
    });
  }
}

export default new SenderController();
