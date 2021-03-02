import { Sequelize, Model, Optional, DataTypes, Association, BelongsToGetAssociationMixin, BelongsToSetAssociationMixin, BelongsToCreateAssociationMixin} from "sequelize";
import { Menu, MenuCreationAttributes } from "./menu";
import { Script, ScriptCreationAttributes } from "./script";

interface ButtonAttributes {
    id: number;
    buttonName: string;
    translations?: object;
}

export interface ButtonCreationAttributes extends Optional<ButtonAttributes, "id"> {
    Menu?: MenuCreationAttributes;
    Script?: ScriptCreationAttributes;
};

export class Button extends Model<ButtonAttributes, ButtonCreationAttributes> implements ButtonAttributes {
    public id!: number;
    public buttonName!: string;
    translations?: object;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    //belongs to Menu
    public getMenu !: BelongsToGetAssociationMixin<Menu>;
    public setMenu !: BelongsToSetAssociationMixin<Menu, number>;
    public createMenu !: BelongsToCreateAssociationMixin<Menu>;

    public readonly menu?: Menu;

    public static associations: {
        menu: Association<Button, Menu>;
        script: Association<Button, Script>;
    }
}

export default function ButtonFactory(sequelize: Sequelize): typeof Button {
    Button.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            buttonName: {
                type: DataTypes.STRING,
                allowNull: false
            },
            translations: {
                type: DataTypes.JSON,
                allowNull: true
            }
        }, {
            tableName: "buttons",
            sequelize
        }
    );
    return Button;
}