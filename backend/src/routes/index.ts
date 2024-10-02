import { Router } from "express";
import frizbeeRoutes from "./frizbeeRoutes";
import gammeRoutes from "./gammeRoutes";
import etapeRoutes from "./etapeRoutes";
import procedeRoutes from "./procedeRoutes";
import ingredientRoutes from "./ingredientRoutes";
import composerRoutes from "./composerRoutes";
import constituerRoutes from "./constituerRoutes";

const router = Router();

router.use("/frizbees", frizbeeRoutes);
router.use("/gammes", gammeRoutes);
router.use("/etapes", etapeRoutes);
router.use("/procedes", procedeRoutes);
router.use("/ingredients", ingredientRoutes);
router.use("/composer", composerRoutes);
router.use("/constituer", constituerRoutes);

export default router;
