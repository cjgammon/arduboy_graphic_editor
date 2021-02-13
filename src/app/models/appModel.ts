
export interface IAppState{
    width: number;
    height: number;
    color: Array<number>;
    data: Array<any>;
    colors: Array<any>;
}

export class AppState implements IAppState {
    width: number = 128;
    height: number = 64;
    color: Array<number> = [0, 0, 0, 255];
    data: Array<any> = [];
    colors: Array<any> = [[0, 0, 0, 255], [255, 255, 255, 255]];
}

export default new AppState();