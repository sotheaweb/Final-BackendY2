import * as sqlTransection  from '../repositories/sqlTransectionRepositories.js'

export async function getAllImformation(req, res) {
    try{
        const imformations = await sqlTransection.getImformation();
        res.json(imformations);
    }
    catch (error){
        console.error("Error fetching Imformation", error);
        throw error;
    }
}

export async function create(req, res) {
    try{
        const data = req.body
        const newInfo = await sqlTransection.create(data);
        res.status(201).json(newInfo);
    }
    catch (error){
    console.error("Error creating neInfo:", error);
    }
}

export async function deleteInfo(req, res) {
    try{
        await sqlTransection.deleteInfo(req.params.id);
        res.status(204).json({message: "Delete successfuly!"});
    } 
    catch (error){
        console.error("Error deleting Info:", error);
        res.status(500).json({message: "Server Error!"});
    }
}
