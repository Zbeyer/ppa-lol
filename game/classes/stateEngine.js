class StateEngine
{
	constructor()
	{
		if (!StateEngine.instance)
		{
			StateEngine.instance = this;
		}

		return StateEngine.instance;
	}
	static saveData(fileName, key, value)
	{
		fileName = fileName || "saveData";
		key = key || "saveData";

		localStorage.setItem(fileName + "_" + key, value);
	}
	static loadData(fileName, key)
	{
		fileName = fileName || "saveData";
		key = key || "saveData";

	 	return localStorage.getItem(fileName + "_" + key);

	}
}
