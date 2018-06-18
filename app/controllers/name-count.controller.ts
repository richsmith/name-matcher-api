import { Router, Request, Response } from 'express';
import * as fs from "fs";
import * as path from "path";

const router: Router = Router();

const DATA_SOURCE_PATH = path.join(__dirname, "../../data/output.txt");

let names_to_counts: Map<string, number>;

router.get('/', (req: Request, res: Response) => {
    let name = req.query.name;
    const count = getCount(name);
    const result = {
        name: name,
        count: count
    }
    res.send(result);
});


function getCount(name: string) {

    if (names_to_counts == null)  {
        names_to_counts = loadInputFile(DATA_SOURCE_PATH);
    }

    if (names_to_counts.has(name)) {
        return names_to_counts.get(name);
    } else {
        return 0;
    }

}


function loadInputFile(path: string) {
    console.log("Loading names_to_counts map from " + path);
    const source_text = fs.readFileSync(path, "utf8");
    const names_to_counts = parse_input_file(source_text);
    return names_to_counts;
}


function parse_input_file(text:string) {
    // text contains lines of the format
    // name:count
    // e.g Oliver:2
    var namesToCounts: Map<string, number> = new Map<string, number>();
    const rows = text.trim().split(/\r?\n/);
    for (const row of rows) {
        const [name, count] = row.split(":");
        namesToCounts.set(name, parseInt(count));
    }
    return namesToCounts;

}




export const NameCountController: Router = router;
