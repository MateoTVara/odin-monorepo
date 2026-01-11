import entriesService from "../services/entriesService.js";

// export const folderOwnership = async (req, res, next) => {
//   const folderId = Number(req.params.id);
//   const userId = Number(req.user?.id);

//   if (!userId) return res.status(400).send("Unauthorized");

//   try {
//     const folder = await foldersService.readById(folderId);

//     if (!folder) return res.status(404).json({ ok: false, error: "Folder not found" });
//     if (folder.ownerId !== userId) return res.status(403).json({ ok: false, error: "Forbidden" });

//     next();
//   } catch (err) {
//     next(err);
//   }
// }

export const checkOwnership = async (req, res, next) => {
  const entryId = Number(req.params.id);
  const userId = Number(req.user?.id);

  if (!userId) return res.status(400).send("Unauthorized");

  try {
    const entry = await entriesService.readById(entryId);

    if (!entry) return res.status(404).json({ ok: false, error: "Folder not found" });
    if (entry.ownerId !== userId) return res.status(403).json({ ok: false, error: "Forbidden" });

    next();
  } catch (err) {
    next(err);
  }
}